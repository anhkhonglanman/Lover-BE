import userService from "../service/userService";
import {Request, Response} from "express";
class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUserSignup(req.body)
            if (!check) {
                let newUser = await userService.createUser(req.body);
                res.status(201).json(newUser);
            } else {
                res.status(201).json('tai khoan da ton tai');
            }
        }catch (e){
            console.log("error in signup:",e )
            res.status(400).json({
                message: 'error in signup',
                success: false
            })
        }
    }
}
export default new UserController()