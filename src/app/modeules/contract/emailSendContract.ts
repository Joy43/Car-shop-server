import nodemailer from 'nodemailer'
import config from '../../config';


const emailSender = async (
    email: string,
    html: string
) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: config.emailSender,
            pass: config.sender_pass,
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: '"care shops" <ssjoy43@gmail.com>', 
        to: email, 
        subject: "contract us", 
        html, 
    });

    
}

export default emailSender;