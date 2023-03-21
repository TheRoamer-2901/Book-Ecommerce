import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

const app = express()

const corsOptions = {
  origin: 'http://localhost:8000',
  
}


app.use(cors(corsOptions))

app.use(express.urlencoded({extended: true}))
app.use(express.json())



app.get('/', async (req, res) => {
  
  const user = await prisma.product.updateMany({
    where: {
    },
    data: {
      quantity: 0
    }

  })
  res.send("get response")
})


app.get('/auth/login', async (req, res) => {
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

app.post('auth/signup', async (req, res) => {
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



app.get('/product', async (req, res) => {
  
  let productlist = await prisma.product.findMany({
    take: 30
  })
  res.json(productlist)
})

app.post('/product/:id', async (req, res) => {
  const {id : productId} = req.params
  const product = req.body
  delete product.id
  
  
  let updateProduct = await prisma.product.update({
    where: {
      id: productId,
    },
    data: product
  })
  res.json(updateProduct)
})


app.get('/seller/:id/product', async (req, res) => {
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

app.post('/product/filter', async (req, res) => {
  
  let filterOption : any = {}
  
  req.body.forEach((op : {title: string, value: any[]})=> {
    if(Object.keys(op.value).length > 0) {
      filterOption[op.title] = op.value
    }
  })
  console.log(filterOption);
  
  
  const filterProds = await prisma.product.findMany({
    where: filterOption
  })
  
  res.json(filterProds)
})

app.get('/product/:id', async (req, res) => {
  
  const { id : productId} = req.params;  

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