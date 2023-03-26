import express from 'express'
import { prisma } from '../server.js'

const router = express()

router.get('/', async (req, res) => {
  
    let productlist = await prisma.product.findMany({
      take: 30
    })
    res.json(productlist)
  })
  

router.post('/filter', async (req, res) => {
  
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