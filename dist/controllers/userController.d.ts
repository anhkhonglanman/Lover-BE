import { Request, Response } from "express";
declare class UserController {
    signup: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    allUser: (req: Request, res: Response) => Promise<void>;
    showUser: (req: Request, res: Response) => Promise<void>;
    editUser: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
