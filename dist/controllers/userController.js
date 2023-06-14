"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class UserController {
    constructor() {
        this.signup = async (req, res) => {
            try {
                let check = await userService_1.default.checkUserSignup(req.body);
                if (!check) {
                    let newUser = await userService_1.default.save(req.body);
                    if (req.body.email) {
                        console.log('1');
                        const transporter = nodemailer_1.default.createTransport({
                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: 'loveandlove4f@gmail.com',
                                pass: 'vpckhppikkspxyhh'
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });
                        let mainOptions = {
                            from: 'loveAndlove4f@gmail.com',
                            to: req.body.email,
                            subject: 'Thông báo đăng ký tài khoản thành công',
                            text: 'Đã đăng ký thành công - Chờ hệ thống duyệt',
                        };
                        console.log(mainOptions);
                        transporter.sendMail(mainOptions, function (err, info) {
                            console.log('2');
                            if (err) {
                                console.log(err);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                    }
                    res.status(201).json({
                        success: true,
                        data: newUser
                    });
                }
                else {
                    res.status(201).json('tai khoan da ton tai');
                }
            }
            catch (e) {
                console.log("error in signup:", e);
                res.status(400).json({
                    message: 'error in signup',
                    success: false
                });
            }
        };
        this.login = async (req, res) => {
            try {
                let payload = await userService_1.default.loginCheck(req.body);
                console.log('login with user: ', payload);
                if (payload === "User is not exist") {
                    res.status(401).json({
                        payload
                    });
                }
                else if (payload === "Password is wrong") {
                    res.status(401).json({
                        payload
                    });
                }
                else {
                    res.status(200).json({
                        payload
                    });
                }
            }
            catch (e) {
                console.log("error in login:", e);
                res.status(400).json({
                    message: 'error in login',
                    success: false
                });
            }
        };
        this.allUser = async (req, res) => {
            let users = await userService_1.default.all();
            res.status(200).json({
                data: users
            });
        };
        this.showUser = async (req, res) => {
            let userId = req.params.id;
            let user = await userService_1.default.findOne(userId);
            res.status(200).json({
                data: user
            });
        };
        this.updateToProvider = async (req, res) => {
            let userId = req.params.id;
            let newRole = await userService_1.default.updateRole(userId);
            res.status(200).json(newRole);
        };
        this.editUser = async (req, res) => {
            let user = req.body;
            let id = req.params.id;
            let newUser = await userService_1.default.update(id, user);
            res.status(200).json({
                data: newUser
            });
        };
        this.delete = async (req, res) => {
            await userService_1.default.delete(req.params.id);
            res.status(200).json('delete user success');
        };
        this.searchUsername = async (req, res) => {
            try {
                let username = req.params.name;
                let user = await userService_1.default.adminSearchUsername(username);
                res.status(200).json(user);
            }
            catch (e) {
                console.log("error in searchUsername:", e);
                res.status(400).json({
                    message: 'error in searchUsername',
                    success: false
                });
            }
        };
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map