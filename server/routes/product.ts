import express from 'express'
import { prisma } from '../server.js'

const router = express()

const PAGE_SIZE = 12

router.get('/', async (req : any, res) => {
    const currentPage = parseInt(req.query.page)
    let productlist = await prisma.product.findMany({
        skip: (currentPage-1)*PAGE_SIZE, 
        take: PAGE_SIZE
    })
    res.json(productlist)
  })
  

router.get('/filter', async (req : any, res) => {
    const currentPage = parseInt(req.query.page)
    const options = req.query.options
    
    
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
        skip: (currentPage-1)*PAGE_SIZE,
        take: PAGE_SIZE,
        orderBy: {
            price: "asc"
        }
    })

    res.json(filterProducts)
})

router.get('/count', async (req, res) => {
    const {_count} = await prisma.product.aggregate({
        _count: {id: true}
    })
    
    res.send({count: _count.id})
})
router.get('/filter/count', async (req : any, res) => {
    const options = req.query.options
    
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
    
    res.send({count: filterProducts.length})
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