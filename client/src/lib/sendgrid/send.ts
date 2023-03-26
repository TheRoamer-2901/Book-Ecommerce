import { makeRequest } from '../axios/request'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(import.meta.env.VITE_SENGRID_KEY)

export type mailMsg = {
    to: string, // Change to your recipient
    from: string, // Change to your verified sender
    subject: string,
    text: string,
    html: string  
}

export function sendMail(msg: mailMsg) {
    return (
        makeRequest('mail/send', {
            method: 'post',
            data: msg
        })
    )
}