import express from 'express'
import { prisma } from '../server.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = express.Router()

router.get('/token', authenticateToken, (req : any, res) => {
    const user = req.user;            
    res.json(user)
}) 

router.post('/update/role', authenticateToken, async (req : any, res) => {
    const user = req.user;    
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        }, 
        data: {
            role: ['User', 'Seller']
        }
    })
    
    res.json({role: updatedUser.role})
}) 

router.post('/update', authenticateToken, async (req : any, res) => {    
    const userId = req.user.id
    const data = req.body
    if (data.password == "") delete data.password
    const updatedUserProfile = await prisma.user.update({
        where: {
            id: userId
        },
        data: data, 
        select: {
            name: true,
            img: true,
            email: true,
            phone: true,

        }
    })
    
    res.json(updatedUserProfile)    
})
    

export default router