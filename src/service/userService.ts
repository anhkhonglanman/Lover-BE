import {AppDataSource} from "../ormconfig";
import {User} from "../entity/User";
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken";
import { Like } from "typeorm";
import {Role} from "../entity/Role";
import {PageMeta} from "../lib/paginate";
import {ProviderListPaginated, ProviderPaginate} from "../lib/provider-paginate";
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
                let token = await (jwt.sign(payload, process.env.SECRET_OR_KEY, {
                    expiresIn: 3600000 * 10 * 100000
                }))
                payload['token'] = token
                return payload;
            }else {
                return 'Password is wrong'
            }
        }
    }
    findOne = async (userId) => {
        let userFind = await this.userRepository.findOne({
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
    // all = async () => {
    //     return await this.userRepository.find({
    //         relations: {
    //             role: true
    //         }
    //     })
    // }
    all = async (q) => {
        const sql = this.userRepository
            .createQueryBuilder('u')
            .leftJoinAndSelect('u.role', 'r')
            // .orderBy('a.createdAt', 'DESC')
            .take(q.take ? q.take : 10)
            .skip(q.skip ? q.skip : 1);

        //search keyword
        if (q.keyword) {
            sql.andWhere(
                `(
        a.name like :keyword
        OR a.city like :keyword
      )`,
                {keyword: `%${q.keyword}%`},
            );
        }

        //search giới tính
        if (q.sex) {
            sql.andWhere(
                `(a.sex  like :sex)`, {sex: `${q.sex}`}
            )
        }

        if (q.role) {
            sql.andWhere(`(r.name like :role)`, {
                role: `%${q.role}%`,
            });
        }

        const [entities, total] = await sql.getManyAndCount();

        // tính  bản ghi
        const meta = new PageMeta({options: q, total});

        //phân trang và chuẩn hoá dữ liệu đầu ra
        return new ProviderListPaginated(entities.filter((c) => new ProviderPaginate(c)), meta)
    }
    update = async (id, user) => {
        await this.userRepository.update({id: id}, user);
    }
    updateRole = async (id) => {
        let providerRole = await AppDataSource.getRepository(Role).findOneBy({id: 3})
        await this.userRepository.update({id: id}, {role: providerRole});
    }
    lock =  async (id) => {
        let isLock = await this.userRepository.findOneBy({isLocked: true})
        await this.userRepository.update({id: id}, {isLocked: isLock})
    }


    open =  async (id) => {
        let isOpen = await this.userRepository.findOneBy({isLocked: false})
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
