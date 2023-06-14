"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
require('dotenv').config();
const mailer = require('nodemailer');
class UserController {
    constructor() {
        this.signup = async (req, res) => {
            try {
                let check = await userService_1.default.loginCheck({ username: req.body.username });
                if (!check) {
                    let mailConfig = {
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                            user: process.env.NODEMAILERUSER,
                            pass: process.env.NODEMAILERPASS,
                        },
                    };
                    let transporter = mailer.createTransport(mailConfig);
                    let mailOptions = {
                        from: process.env.NODEMAILERUSER,
                        to: "sonkdqte@gmail.com",
                        subject: "dang ky tai khoan",
                        text: "Dang ky thanh cong !",
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                    });
                    let newUser = await userService_1.default.save(req.body);
                    res.status(201).json({
                        success: true,
                        data: newUser
                    });
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