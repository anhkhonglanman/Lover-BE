import {AppDataSource} from "../ormconfig";
import {User} from "../entity/User";
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken";
import {SECRET} from "../middleware/auth";
import { Like } from "typeorm";
import {Role} from "../entity/Role";
class UserService{
    private userRepository;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }
    save = async (user) => {
        let password = await bcrypt.hash(user.password, 10)
        user.password = password;
        user.role = 1
        await this.userRepository.save(user);
    }
    loginCheck = async (user) => {
        // let userFind = await this.userRepository.findOneBy({username: user.username});
        let userFind = await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                username: user.username
            }
        });
        if(!userFind){
            return 'User is not exist'
        }else {
            let passWordCompare = await bcrypt.compare(user.password, userFind.password);
            if(passWordCompare){
                if (userFind.isLocked) {
                    return {
                        isLocked: true
                    }
                }
                let payload = {
                    idUser: userFind.id,
                    username: userFind.username,
                    role: userFind.role,
                    isLocked: userFind.isLocked
                }
                let token = await (jwt.sign(payload, SECRET, {
                    expiresIn: 36000 * 1000
                }))
                payload['token'] = token
                return payload;
            }else {
                return 'Password is wrong'
            }
        }
    }
    findOne = async (userId) => {
        let userFind = await this.userRepository.find({
            relations: {
                role: true
            },
            where: {
                id: userId
            }
        })
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
    updateRole = async (id) => {
        let providerRole = await AppDataSource.getRepository(Role).findOneBy({id: 3})
        await this.userRepository.update({id: id}, {role: providerRole});
    }
    lock =  async (id) => {
        let isLock = await this.userRepository.findOneBy({isLocked: 1})
        await this.userRepository.update({id: id}, {isLocked: isLock})
    }
    open =  async (id) => {
        let isOpen = await this.userRepository.findOneBy({isLocked: 0})
        await this.userRepository.update({id: id}, {isLocked: isOpen})
    }
    delete = async (id) => {
        await this.userRepository.delete({id: id})
    }
    adminSearchUsername = async (username) => {
        try {
            let searchPeople = await this.userRepository.find({
                where: {
                    username: Like(`%${username}%`),
                    role: 'user'
                }
            });
            return searchPeople;
        } catch (error) {
            console.log(`Error ${error} on adminSearchUsername in adminUserService`);
            throw error;
        }
    }
    checkMail = async (owner: string) => {
        const findMail = await this.userRepository.findOne({ where: { email: owner } });
        return !findMail; // Trả về true nếu không tìm thấy otp có owner trùng
      };
}
export default new UserService()
