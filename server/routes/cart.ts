import express from "express"
import { prisma } from '../server.js'
import { authenticateToken } from "../middleware/authenticateToken.js"
import { transformDocument } from "@prisma/client/runtime/index.js"


const router = express.Router()

router.post('/item/add', async (req, res) => {

    const cartItem = await prisma.cartItem.create({
        data: {
            product: {
                connect: {
                    id: req.body.product.id
                }
            },
            quantity: req.body.quantity
        },
        include: {
            product: true
        }
    })
    const cart = await prisma.cart.upsert({
        where: {
            userId: req.body.userId,
        },
        update: {
            user: {
                connect: {
                    id: req.body.userId  
                }
            },
            cartItems: {
                connect: [{id: cartItem.id}]
            }
        }, 
        create: {
            user: {
                connect: {
                    id: req.body.userId  
                }
            },
            cartItems: {
                connect: [{id: cartItem.id}]
            }
        }
    })
    res.json(cartItem)
})

router.post("/item/update/quantity", async (req, res) => {

    const quantity = req.body.quantity
    const quantityOption = req.query.option === 'increase' ? {increment : quantity} : {decrement: quantity}
    const updatedItem = await prisma.cartItem.update({
        where: {
            id: req.body.itemId
        },
        data: {
            quantity: quantityOption
        },
        include: {
            product: true
        } 
    })

    res.json({...updatedItem, quantity: req.query.option === 'increase' ? quantity : -quantity})
})

router.post("/item/delete", async (req, res) => {    
    const deletedItem = await prisma.cartItem.delete({
        where: {
            id: req.body.itemId
        },
        include: {
            product: true
        }
    })

    res.json(deletedItem)
})

router.post("/sync", authenticateToken, async (req : any, res) => {    
    let cart : any = await prisma.cart.findFirst({
        where: {
            userId: req.user.id
        },
        include: {
            cartItems: {
                include: {
                    product: true
                }
            }
        }
    })
    const inSyncItems = req.body.filter(item => item.id === 'default id')
    let items = cart?.cartItems
    let newItems : any[] = []

    if(inSyncItems.length > 0) {
        inSyncItems.forEach((syncItem) => {
            let newItem = true
            for(let item of items!) {
                if(item.productId === syncItem.product.id) {
                    newItem = false
                    item.quantity = item.quantity + syncItem.quantity
                    newItems.push({
                        quantity  : item.quantity,
                        productId: syncItem.product.id
                    })
                    break
                } 
            }
            if(newItem) {
                newItems.push({
                    quantity  : syncItem.quantity,          
                    productId: syncItem.product.id
                })
            }
        })
        cart = await prisma.cart.update({
            where: {
                userId: req.user.id
            },
            data: {
                cartItems: {                
                    deleteMany: {},
                    createMany: {data: newItems},
                }
            },
            include: {
                cartItems: {
                    include: {
                        product: true
                    }
                }
            }
        })
    }
    newItems = cart?.cartItems.filter(item => !item.isOrdered)
    res.json(newItems)
    
})

export default router

