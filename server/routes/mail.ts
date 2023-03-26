import express from 'express'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENGRID_KEY!)

const router = express()


router.post('/send', async (req, res) => {
    const mailContent = req.body
    await sgMail
          .send(mailContent)
          .then(res => console.log(res))
          .catch(err => console.error(err))
  
    res.json("Mail send")
})

 
export default router;