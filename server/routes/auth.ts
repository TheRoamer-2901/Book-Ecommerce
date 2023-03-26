import express from 'express';
import { prisma } from '../server.js'

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
    res.send(user)
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

export default router
