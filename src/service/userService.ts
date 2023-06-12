import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";
class UserService{
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
    save = async (user) => {
        let password = await bcrypt.hash(user.password, 10)
        user.password = password;
        // user.role = 1
        await this.userRepository.save(user);
    }
    loginCheck = async (user) => {
        let foundUser = await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                username: user.username
            }
        })
        console.log("foundUser:", foundUser)
        if (foundUser) {
            let pass = await bcrypt.compare(user.password, foundUser.password);
            if (pass) {
                let payload = {
                    id: foundUser.id,
                    username: foundUser.username,
                    role: foundUser.role.id
                }
                return {
                    info: {
                        username: foundUser.username,
                        role: foundUser.role.id
                    },
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: '1h'
                    })
                }
            }
            return null
        }
        return null
    }

    findOne = async (userId) => {
        let userFind = await this.userRepository.findOneBy({id : userId})
        return userFind
    }
    checkUserSignup = async (user) => {
        let userFind = await this.userRepository.findOne({
            where: {
                username: user.username,
                // password: user.password
            }
        });
        return userFind;
    }
    all = async () => {
        return await this.userRepository.find({
            relations: {
                role: true
            }
        })
    }
    update = async (id, user) => {
        await this.userRepository.update({id: id}, user);
    }
    delete = async (id) => {
        await this.userRepository.delete({id: id})
    }
}

export default new UserService()