import userService from "../service/userService";
import {Request, Response} from "express";
import nodemailer from "nodemailer"

class UserController {
    // sendEmail = async (req: Request, res: Response) => {
    //     //Tiến hành gửi mail, nếu có gì đó bạn có thể xử lý trước khi gửi mail
    //     let transporter =  nodemailer.createTransport({ // config mail server
    //         host: 'smtp.gmail.com',
    //         port: 465,
    //         secure: false,
    //         requireTLS: true,
    //         auth: {
    //             user: 'loveAndlove4f@gmail.com', //Tài khoản gmail vừa tạo
    //             pass: 'Z1233456@' //Mật khẩu tài khoản gmail vừa tạo
    //         },
    //         tls: {
    //             // do not fail on invalid certs
    //             rejectUnauthorized: false
    //         }
    //     })
    //     let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
    //         from: 'loveAndlove4f@gmail.com',
    //         to: req.body.mail,
    //         subject: 'Thông báo đăng ký tài khoản thành công',
    //         text: 'Đã đăng ký thành công - Chờ hệ thống duyệt',
    //     }
    //     transporter.sendMail(mainOptions, function(err, info){
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //         }
    //     });
    // }
    signup = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUserSignup(req.body)
            if (!check) {
                let newUser = await userService.save(req.body);
                if (req.body.email) {
                    console.log('1')
                    const transporter = nodemailer.createTransport({ // config mail server
                        service: 'gmail',
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'loveandlove4f@gmail.com', //Tài khoản gmail vừa tạo
                            // user: 'webstorm', //Tài khoản gmail vừa tạo
                            pass: 'vpckhppikkspxyhh' //Mật khẩu tài khoản gmail vừa tạo
                        },
                        tls: {
                            // do not fail on invalid certs
                            rejectUnauthorized: false
                        }
                    })
                    let mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                        from: 'loveAndlove4f@gmail.com',
                        to: req.body.email,
                        subject: 'Thông báo đăng ký tài khoản thành công',
                        text: 'Đã đăng ký thành công - Chờ hệ thống duyệt',
                    }
                    console.log(mainOptions)
                    transporter.sendMail(mainOptions, function (err, info) {
                        console.log('2')
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
                res.status(201).json({
                    success: true,
                    data: newUser
                });
            } else {
                res.status(201).json('tai khoan da ton tai');
            }
        } catch (e) {
            console.log("error in signup:", e)
            res.status(400).json({
                message: 'error in signup',
                success: false
            })
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            let payload = await userService.loginCheck(req.body)
            console.log('login with user: ', payload)
            if (payload === "User is not exist") {
                res.status(401).json({
                    payload
                });
            } else if (payload === "Password is wrong") {
                res.status(401).json({
                    payload
                });
            } else {
                res.status(200).json({
                    payload
                });
            }

        } catch (e) {
            console.log("error in login:", e)
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
        try {
            let username = req.params.name;
            let user = await userService.adminSearchUsername(username);
            res.status(200).json(user);
        } catch (e) {
            console.log("error in searchUsername:", e)
            res.status(400).json({
                message: 'error in searchUsername',
                success: false
            })
        }
    }
}

export default new UserController()