import userService from "../service/userService";
import {Request, Response} from "express";
class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUserSignup(req.body)
            if (!check) {
                let newUser = await userService.save(req.body);
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
    login = async (req: Request, res: Response) =>{
        let payload = await userService.loginCheck(req.body)
        console.log('login with user: ', payload)
        res.status(200).json({
            success: true,
            data: payload
        });
    }
    allUser = async (req: Request, res: Response) => {
        let users = await userService.all();
        res.status(200).json({
            data: users
        })
    }
    showUser = async (req: Request, res: Response) => {
        let userId = req.params.id;
        let user = await userService.findOne(userId)
        res.status(200).json({
            data: user
        })
    }
    editUser = async (req: Request, res: Response) => {
        let user = req.body;
        let id = req.params.id;
        let newUser = await userService.update(id, user)
        res.status(200).json({
            data: newUser
        })
    }
    delete = async (req: Request, res: Response) => {
        await userService.delete(req.params.id)
        res.status(200).json('delete user success')
    }
}
export default new UserController()