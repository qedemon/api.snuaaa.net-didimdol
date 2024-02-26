require("dotenv").config();
const {createTransport} = require("nodemailer");

(
    async()=>{
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
            to: process.argv[2],
            subject: "test 메일입니다.",
            html: "<h1>자니? 자는구나! 잘자.</h1>"
        }

        await transporter.sendMail(mailOptions);
    }
)();