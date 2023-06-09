import { Request, Response } from "express";
declare class UserController {
    signup: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
