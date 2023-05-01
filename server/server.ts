import dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.js';
import mailRouter from './routes/mail.js';
import producRouter from './routes/product.js';
import userRouter from './routes/user.js';
import cartRouter from './routes/cart.js'
import orderRouter from './routes/order.js'
import sellerRouter from './routes/seller.js'
import searchRouter from './routes/search.js'


export const prisma = new PrismaClient()

const app = express()


const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
}


app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRouter)

app.use('/user', userRouter)

app.use('/mail', mailRouter)

app.use('/product', producRouter)

app.use('/cart', cartRouter)

app.use('/order', orderRouter)

app.use('/seller', sellerRouter)

app.use('/search', searchRouter)
  
  

app.listen(3000, () => {
  console.log("listening on port 3000");
  
})