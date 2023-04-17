import express from "express"
import { authenticateToken } from "../middleware/authenticateToken.js"
import { prisma } from '../server.js'


const router = express.Router()

router.get('/product', authenticateToken, async (req : any, res) => {
    
    const id = req.user.id
    const sellerProductlist = await prisma.product.findMany({
      where: {
        sellerId: id
      }
    })  
    res.json(sellerProductlist)
  
}) 

router.get('/product/filter', authenticateToken, async (req : any, res) => {
    const options = req.query.options
    const sellerId = req.user.id
    
    let filterOption : any = {
        sellerId: sellerId
    }

    options.forEach((op : {title: string, value: any})=> {
        switch(op.title) {
            case "price":
                filterOption["price"] = {gte: 0, lte: Number.MAX_VALUE}
                filterOption["price"].gte = parseInt(op.value.gte)
                filterOption["price"].lte = parseInt(op.value.lte)
                break;
            case "rating":
                filterOption["rating"] = {gte: 0, lte: Number.MAX_VALUE}
                filterOption["rating"].gte = parseInt(op.value.gte)
                filterOption["rating"].lte = parseInt(op.value.lte)
                break;
            case "genres":
                filterOption["genres"] = { hasEvery: op.value.in}
        }
    })


    const filterProducts = await prisma.product.findMany({
        where: filterOption,
        orderBy: {
            price: "asc"
        }
    })

    res.json(filterProducts)
})

router.post('/product/update', async(req, res) => {
    let product = req.body
    const productId = product.id
    delete product.id

    const updatedProduct = await prisma.product.update({
        where: {
            id: productId
        },
        data: product
    })

    res.json(updatedProduct)
    
})

router.post('/product/create', async(req, res) => {
    let product = req.body
    
    const newProduct = await prisma.product.create({
        data: product
    })

    res.json(newProduct)
    
})


export default router

