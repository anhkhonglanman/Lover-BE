import {AppDataSource} from "../data-source";
import {User} from "../entity/User";
import bcrypt from  "bcrypt"
class UserService{
    private userRepository;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
    }

    createUser = async (user) => {
        let password = await bcrypt.hash(user.password, 10)
        let newUser = new User();
        newUser.username = user.username;
        newUser.password = password;
        newUser.phoneNumber = user.phoneNumber;
        newUser.firstname = user.firstname;
        newUser.lastname = user.lastname;
        newUser.address = user.address;
        newUser.email = user.email;
        newUser.identityCard = user.identityCard;
        newUser.role = parseInt(user.role)
        await this.userRepository.save(newUser);
        return newUser
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
}

export default new UserService()