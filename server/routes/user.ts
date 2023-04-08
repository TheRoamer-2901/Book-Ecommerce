import express from 'express'
import { authenticateToken } from '../middleware/authenticateToken.js'

const router = express.Router()

router.get('/token', authenticateToken, (req : any, res) => {
    const user = req.user;
    
    res.json(user)
}) 
    

export default router