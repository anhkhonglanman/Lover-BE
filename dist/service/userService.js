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
const typeorm_1 = require("typeorm");
const Role_1 = require("../entity/Role");
class UserService {
    constructor() {
        this.save = async (user) => {
            let password = await bcrypt_1.default.hash(user.password, 10);
            user.password = password;
            user.role = 1;
            await this.userRepository.save(user);
        };
        this.loginCheck = async (user) => {
            let userFind = await this.userRepository.findOneBy({ username: user.username });
            if (!userFind) {
                return 'User is not exist';
            }
            else {
                let passWordCompare = await bcrypt_1.default.compare(user.password, userFind.password);
                if (passWordCompare) {
                    let payload = {
                        idUser: userFind.id,
                        username: userFind.username,
                        role: userFind.role
                    };
                    let token = (jsonwebtoken_1.default.sign(payload, auth_1.SECRET, {
                        expiresIn: 36000 * 1000
                    }));
                    payload['token'] = token;
                    return payload;
                }
                else {
                    return 'Password is wrong';
                }
            }
        };
        this.findOne = async (userId) => {
            let userFind = await this.userRepository.find({
                relations: {
                    role: true
                },
                where: {
                    id: userId
                }
            });
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
        this.updateRole = async (id) => {
            let providerRole = await data_source_1.AppDataSource.getRepository(Role_1.Role).findOneBy({ id: 3 });
            await this.userRepository.update({ id: id }, { role: providerRole });
        };
        this.delete = async (id) => {
            await this.userRepository.delete({ id: id });
        };
        this.adminSearchUsername = async (username) => {
            try {
                let searchPeople = await this.userRepository.find({
                    where: {
                        username: (0, typeorm_1.Like)(`${username}%`),
                        role: 'user'
                    }
                });
                return searchPeople;
            }
            catch (error) {
                console.log(`Error ${error} on adminSearchUsername in adminUserService`);
                throw error;
            }
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map