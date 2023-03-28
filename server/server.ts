import dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.js';
import mailRouter from './routes/mail.js';
import producRouter from './routes/product.js';

import { authenticateToken } from './middleware/authenticateToken.js'


export const prisma = new PrismaClient()

const app = express()


const corsOptions = {
  origin: 'http://localhost:8000',
  credentials: true
}


app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/mail', mailRouter)

app.use('/product', producRouter)




app.get('/seller/:id/product', authenticateToken, async (req, res) => {
  const {id} = req.params
  const sellerProductlist = await prisma.product.findMany({
    where: {
      sellerId: id
    }
  })  
  res.json(sellerProductlist)

}) 

app.get('/productname/:name', async (req, res) => {
  const {name} = req.params
  
  if(!name) res.json([])
  const productNames = await prisma.product.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    },  
    select: {
      id: true,
      name: true
    }
  })
  
  res.json(productNames)
})

  

app.listen(3000, () => {
  console.log("listening on port 3000");
  
})