require('dotenv').config();
import {Request, Response} from "express";
import otpService from "../service/OtpService";
const mailer = require('nodemailer');

class MailController {
    sendOtp = async (req: Request, res: Response) => {
        let check = await otpService.checkMail(req.body.owner)
        if(check == true){
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
                    res.status(201).json({
                    success: true,
                    data: otp,
                    message: "Get Otp Success"
                });
            }else if(check == false){
                res.status(401).json({
                    success: false,
                    message: "ERROR: same email"
                });
            }
    }

    

}

export default new MailController()
