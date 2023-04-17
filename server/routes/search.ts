import express from 'express'
import { prisma } from '../server.js'

const router = express.Router()


router.get('/product/name', async (req, res) => {    
    const productName = req.query.name
    
    if(!productName) res.json([])
    const productNames = await prisma.product.findMany({
      where: {
        name: {
          contains: productName as string,
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

router.get('/product/author', async (req, res) => {    
    const authorName = req.query.name
    
    if(!authorName) res.json([])
    const productNames = await prisma.product.findMany({
      where: {
        author: {
          contains: authorName as string,
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
  

export default router