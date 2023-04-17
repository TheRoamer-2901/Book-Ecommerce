import express from 'express'
import { prisma } from '../server.js'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = express.Router()

router.get('/token', authenticateToken, (req : any, res) => {
    const user = req.user;
    
    res.json(user)
}) 

router.post('/update', authenticateToken, async (req : any, res) => {    
    const userId = req.user.id
    const updatedUserProfile = await prisma.user.update({
        where: {
            id: userId
        },
        data: req.body, 
        select: {
            name: true,
            img: true,
            email: true,
            phone: true,

        }
    })
    console.log("profile: ", updatedUserProfile);
    res.json(updatedUserProfile)    
})
    

export default router