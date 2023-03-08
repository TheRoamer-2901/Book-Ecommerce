import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const app = express()

const corsOptions = {
  origin: 'http://localhost:8000'
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.send("get response")
})

app.get('/product', async (req, res) => {
  let productlist = await prisma.product.findMany({
    take: 30
  })
  res.json(productlist)
})

app.get('/product/:id', async (req, res) => {
  const { id : productId} = (req.params);  
  
  let product = await prisma.product.findUnique({
    where: {
      id: productId
    }
  })
  res.json(product)
})

app.listen(3000, () => {
  console.log("listening on port 3000");
  
})