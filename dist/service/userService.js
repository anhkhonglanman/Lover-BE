"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
class UserService {
    constructor() {
        this.save = async (user) => {
            let password = await bcrypt_1.default.hash(user.password, 10);
            user.password = password;
            user.role = 1;
            await this.userRepository.save(user);
        };
        this.loginCheck = async (user) => {
            let foundUser = await this.userRepository.findOne({
                relations: {
                    role: true
                },
                where: {
                    username: user.username
                }
            });
            console.log("foundUser:", foundUser);
            if (foundUser) {
                let pass = await bcrypt_1.default.compare(user.password, foundUser.password);
                if (pass) {
                    let payload = {
                        id: foundUser.id,
                        username: foundUser.username,
                        role: foundUser.role.id
                    };
                    return {
                        info: {
                            username: foundUser.username,
                            role: foundUser.role.id
                        },
                        token: jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                            expiresIn: '1h'
                        })
                    };
                }
                return null;
            }
            return null;
        };
        this.findOne = async (userId) => {
            let userFind = await this.userRepository.findOneBy({ id: userId });
            return userFind;
        };
        this.checkUserSignup = async (user) => {
            let userFind = await this.userRepository.findOne({
                where: {
                    username: user.username,
                }
            });
            return userFind;
        };
        this.all = async () => {
            return await this.userRepository.find({
                relations: {
                    role: true
                }
            });
        };
        this.update = async (id, user) => {
            await this.userRepository.update({ id: id }, user);
        };
        this.delete = async (id) => {
            await this.userRepository.delete({ id: id });
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map