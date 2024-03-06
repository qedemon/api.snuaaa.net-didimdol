require("dotenv").config();
const {createTransport} = require("nodemailer");

async function sendEmail(to, subject, content){
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    
    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: to,
        subject: subject,
        html: content
    }

    await transporter.sendMail(mailOptions);

    return true;
}

module.exports = sendEmail;