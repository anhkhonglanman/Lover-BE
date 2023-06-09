"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../service/userService"));
class UserController {
    constructor() {
        this.signup = async (req, res) => {
            try {
                let check = await userService_1.default.checkUserSignup(req.body);
                if (!check) {
                    let newUser = await userService_1.default.createUser(req.body);
                    res.status(201).json(newUser);
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
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map