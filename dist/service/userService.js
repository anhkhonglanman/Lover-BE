"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const User_1 = require("../entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        this.createUser = async (user) => {
            let password = await bcrypt_1.default.hash(user.password, 10);
            let newUser = new User_1.User();
            newUser.username = user.username;
            newUser.password = password;
            newUser.phoneNumber = user.phoneNumber;
            newUser.firstname = user.firstname;
            newUser.lastname = user.lastname;
            newUser.address = user.address;
            newUser.email = user.email;
            newUser.identityCard = user.identityCard;
            newUser.role = parseInt(user.role);
            await this.userRepository.save(newUser);
            return newUser;
        };
        this.checkUserSignup = async (user) => {
            let userFind = await this.userRepository.findOne({
                where: {
                    username: user.username,
                }
            });
            return userFind;
        };
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map