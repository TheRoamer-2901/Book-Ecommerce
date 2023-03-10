import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
const app = express()

const corsOptions = {
  origin: 'http://localhost:8000',
  
}

app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', async (req, res) => {
  await prisma.user.create({
    data: {
      name: "khoa",
      password: "khoa123",
    }
  })
  res.send("get response")
})


app.get('/user', async (req, res) => {
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

app.post('/user', async (req, res) => {
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