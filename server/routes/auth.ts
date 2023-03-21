import express from 'express'
import { prisma } from '../server'

export const router = express.Router()

router.get('/login', async (req, res) => {
    const username : any = req.query.username 
    const password : any = req.query.password
  
    const user = await prisma.user.findFirst({
      where: {
        name: username,
        password: password
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
        }
      })
     
      res.json(newUser)
    }
    
})
  