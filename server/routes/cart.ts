import express from "express"
import { prisma } from '../server.js'


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
    console.log("param: ", req.query);
    console.log("body: ", req.body);
    
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

export default router

