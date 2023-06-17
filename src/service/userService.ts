import {AppDataSource} from "../ormconfig";
import {User} from "../entity/User";
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken";
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
        let foundUser = await this.userRepository.findOne({
            relations: {
                role: true
            },
            where: {
                username: user.username
            }
        })

        if (foundUser) {
            let pass = await bcrypt.compare(user.password, foundUser.password);
            if (pass) {
                let payload = {
                    id: foundUser.id,
                    username: foundUser.username,
                    role: foundUser.role.id,
                }
                let token = await (jwt.sign(payload, process.env.SECRET_OR_KEY, {
                    expiresIn: 3600000 * 10 * 100000
                }))
                payload['token'] = token
                return token;
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
}
export default new UserService()
