require('dotenv').config();
import {Request, Response} from "express";
import otpService from "../service/OtpService";
const mailer = require('nodemailer');
import emailService from "../service/emailService";

class MailController {
    sendOtp = async (req: Request, res: Response) => {
        const otp = await otpService.getOtp(req.body.owner);
                
                if(otp) {
                    //phần này nên cho nó vào 1 service riêng để tái sử dụng
                    let mailConfig = {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: process.env.NODEMAILERUSER,//smtp user
                            pass: process.env.NODEMAILERPASS,//smtp auto gen pass
                        },
                    };
                    let transporter = mailer.createTransport(mailConfig);
                    let mailOptions = {
                        from: process.env.NODEMAILERUSER, //email tạo
                        to: req.body.owner,// email gửi
                        subject: "Vui lòng không chia sẻ mã này !",//chủ đè gửi
                        text: `mã xác nhận ${otp}`,// nội dung
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error.message); /// sử lý callbacks
                            
                        }
                    });
                }
                const getCurrentDateTime = () => {
                    const currentTime = new Date();
                    const year = currentTime.getFullYear();
                    const month = String(currentTime.getMonth() + 1).padStart(2, '0');
                    const day = String(currentTime.getDate()).padStart(2, '0');
                    const hours = String(currentTime.getHours()).padStart(2, '0');
                    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
                    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
                  
                    const dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    return dateTime;
                  };
                  
                  console.log(getCurrentDateTime());
                let newOtp = await emailService.save(req.body, otp, getCurrentDateTime() );
                res.status(201).json({
                    success: true,
                    data: newOtp
                });

    }

}

export default new MailController()
