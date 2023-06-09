import { User } from "../entity/User";
declare class UserService {
    private userRepository;
    constructor();
    createUser: (user: any) => Promise<User>;
    checkUserSignup: (user: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
