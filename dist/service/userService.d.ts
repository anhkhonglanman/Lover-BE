declare class UserService {
    private userRepository;
    constructor();
    save: (user: any) => Promise<void>;
    loginCheck: (user: any) => Promise<"User is not exist" | {
        idUser: any;
        username: any;
        role: any;
    } | "Password is wrong">;
    findOne: (userId: any) => Promise<any>;
    checkUserSignup: (user: any) => Promise<any>;
    all: () => Promise<any>;
    update: (id: any, user: any) => Promise<void>;
    delete: (id: any) => Promise<void>;
    adminSearchUsername: (username: any) => Promise<any>;
}
declare const _default: UserService;
export default _default;
