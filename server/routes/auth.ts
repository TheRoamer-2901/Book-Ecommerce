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
      img: true,
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
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite: 'none', secure: true})    
    res.json({...user, token: accessToken})
  }
})

router.post('/signup', async (req, res) => {
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
        img: true,
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
  const cookies = req.cookies  

  if (Object.entries(cookies).length == 0) { //no refresh token adhere to cookies
    res.sendStatus(401)
  }
  else{
  
    const refreshToken = cookies.jwt
    const user = await prisma.user.findFirst({
      where: {
        refreshToken: refreshToken
      }
    })
    if(user == null) res.sendStatus((403))
    
    let userWithNewAccessToken = {};
    let newAccessToken : string = "";
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as Secret,  (err, user) => {
      if(err) res.sendStatus(403)
      delete user.iat
      delete user.exp
      newAccessToken = jwt.sign(user as JwtPayload, process.env.ACCESS_TOKEN_SECRET as Secret, {expiresIn: '10m'})
    })      
    userWithNewAccessToken = {...user, token: newAccessToken}
    res.json(userWithNewAccessToken)
  }

})

export default router
