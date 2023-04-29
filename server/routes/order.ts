import express from "express"
import { authenticateToken } from "../middleware/authenticateToken.js"
import { prisma } from '../server.js'


const router = express.Router()

router.get('/all', async (req, res) => {
    
    const userId = req.query.userId as string
    const orderList = await prisma.order.findMany({
        where : {
            purchaserId: userId as string
        },
        include: {
            cartItem: {
                include: {
                    product: true
                }
            }
        }
    })

    
    res.json(orderList)
})

router.get('/:id', async (req, res) => {
    
    const orderId = req.params.id
    const order = await prisma.order.findFirst({
        where : {
            id: orderId
        },
        include: {
            cartItem: {
                include: {
                    product: true
                }
            }
        }
    })

    res.json(order)
})

router.post('/create', async(req, res) => {
    
    let orderList = req.body.items
    const itemIdList = orderList.map(order => order.id)
    orderList = orderList.map(order => {
        const initDeliveryStatus : any ={
            date : new Date(),
            state : "Đang xử lý",
            description : "Đặt hàng thành công. Sản phẩm đang trong quá trình xử lý"
        }
        return {
            note : order.orderInfo.note ? order.orderInfo.note : "",
            location: order.orderInfo.location,
            cartItemId : order.id,
            deliveryLog : [initDeliveryStatus],
            appliedCouponValue : order.appliedCouponValue,
            purchaserId: req.body.userId
        }
    })

    const orders = await prisma.order.createMany({
        data : orderList
    })  
    
    const orderedItems = await prisma.cartItem.updateMany({
        where: {
            id: { in : itemIdList}
        },
        data: {
            isOrdered: true
        }
    })
    res.json(itemIdList)
})

export default router

