import userService from "../service/userService";
require('dotenv').config();
import {Request, Response} from "express";
import otpService from "../service/OtpService";
const mailer = require('nodemailer');

class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let check = await userService.loginCheck({username:req.body.username})
            if (!check) {
                const otp = await otpService.getOtp(req.body.email);
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
                        to: req.body.email,// email gửi
                        subject: "Xác thực thông tin email người dùng",//chủ đè gửi
                        text: `mã xác nhận ${otp}`,// nội dung
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message); /// sử lý callbacks
                        }
                    });
                }

                let newUser = await userService.save(req.body);
                res.status(201).json({
                    success: true,
                    data: newUser
                });
            }
        }catch (e){
            console.log("error in signup:",e )
            res.status(400).json({
                message: 'error in signup',
                success: false
            })
        }
    }
    login = async (req: Request, res: Response) =>{
        try {
            let payload = await userService.loginCheck(req.body)
            console.log('login with user: ', payload)
            if( payload === "User is not exist"){
                res.status(401).json({
                    payload
                });
            }else if (payload === "Password is wrong"){
                res.status(401).json({
                    payload
                });
            }else{
                res.status(200).json({
                    payload
                });
            }

        } catch (e) {
            console.log("error in login:",e )
            res.status(400).json({
                message: 'error in login',
                success: false
            })
        }

    }
    allUser = async (req: Request, res: Response) => {
        let users = await userService.all();
        res.status(200).json({
            data: users
        })
    }
    showUser = async (req: Request, res: Response) => {
        let userId = req.params.id;
        let user = await userService.findOne(userId)
        res.status(200).json({
            data: user
        })
    }
    updateToProvider = async (req: Request, res: Response) => {
        let userId = req.params.id
        let newRole = await userService.updateRole(userId)
        res.status(200).json(newRole)
    }
    editUser = async (req: Request, res: Response) => {
        let user = req.body;
        let id = req.params.id;
        let newUser = await userService.update(id, user)
        res.status(200).json({
            data: newUser
        })
    }
    delete = async (req: Request, res: Response) => {
        await userService.delete(req.params.id)
        res.status(200).json('delete user success')
    }
    searchUsername = async (req: Request, res: Response) => {
        try{
        let username = req.params.name;
        let user = await userService.adminSearchUsername(username);
        res.status(200).json(user);
    }catch(e){
        console.log("error in searchUsername:",e )
        res.status(400).json({
            message: 'error in searchUsername',
            success: false
        })
    }}
}
export default new UserController()
