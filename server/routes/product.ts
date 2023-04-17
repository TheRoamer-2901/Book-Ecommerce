import express from 'express'
import { prisma } from '../server.js'

const router = express()

router.get('/', async (req, res) => {
  
    let productlist = await prisma.product.findMany({
      take: 30
    })
    res.json(productlist)
  })
  

router.get('/filter', async (req : {query: {options: any[]}}, res) => {
    const options = req.query.options
    console.log(req.query);
    
    let filterOption : any = {}

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

router.get('/:id', async (req, res) => {

    const { id : productId} = req.params;  

    let product = await prisma.product.findUnique({
        where: {
        id: productId
        }
    })
    res.json(product)
})
  
export default router