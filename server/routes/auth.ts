import express from 'express';
import { prisma } from '../server.js'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const router = express()

router.get('/login', async (req, res) => {  
  const username : any = req.query.username 
  const password : any = req.query.password

  const user = await prisma.user.findFirst({
    where: {
      name: username,
      password: password
    },
    select: {
      id: true,
      password: false,
      name: true,
      email: true,
      phone: true,
      role: true,
    }
  })
  if(!user) res.sendStatus(401)
    else{
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as Secret, { expiresIn: '10m' })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as Secret, { expiresIn: '1d'})
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: refreshToken
      }
    })
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
    res.json({...user, token: accessToken})
  }
})

router.post('/signup', async (req, res) => {
  console.log("try register new user")
  const username : any = req.query.username 
  const password : any = req.query.password

  
  const user = await prisma.user.findFirst({
    where: {
      name: username,
    }
  })
  if(!user) {
    const newUser = await prisma.user.create({
      data: {
        name: username,
        password: password,
        role: ["User"]
      },
      select: {
        id: true,
        password: false,
        name: true,
        email: true,
        phone: true,
        role: true,
      }
    })
   
    res.json(newUser)
  }
})

router.post('/logout', async (req, res) => {
  const userId = req.body.uid 
  
  const user = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      refreshToken: ""
    }
  })
  res.clearCookie('jwt', { httpOnly: true})
  res.sendStatus(204)
})

router.get('/refreshToken', async (req, res) => {
  const refreshToken = req.cookies.jwt
  
  if (refreshToken == null) res.sendStatus(401)
  const user = await prisma.user.findFirst({
    where: {
      refreshToken: refreshToken
    }
  })
  if(user == null) res.sendStatus((403))
  let newAccessToken;
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret,  (err, user) => {
    if(err) res.writeHead(403)
    newAccessToken = jwt.sign(user as JwtPayload, process.env.ACCESS_TOKEN_SECRET as Secret, {expiresIn: '10m'})
  })
  res.send(newAccessToken)
})

export default router
