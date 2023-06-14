import userService from "../service/userService";
import {Request, Response} from "express";
class UserController {
    signup = async (req: Request, res: Response) => {
        try {
            let check = await userService.checkUserSignup(req.body)
            if (!check) {
                let newUser = await userService.save(req.body);
                res.status(201).json({
                    success: true,
                    data: newUser
                });
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
        try {
            let payload = await userService.loginCheck(req.body)
            if( payload === "User is not exist"){
                res.status(401).json({
                    payload
                });
            }else if (payload === "Password is wrong"){
                res.status(401).json({
                    payload
                });
            }else{
                res.status(200).json({
                    data: payload['token']
                });
            }
            
        } catch (e) {
            res.status(400).json({
                message: 'error in login',
                success: false
            })
        }
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
    updateToProvider = async (req: Request, res: Response) => {
        let userId = req.params.id
        let newRole = await userService.updateRole(userId)
        res.status(200).json(newRole)
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
    searchUsername = async (req: Request, res: Response) => {
        try{
        let username = req.params.name;
        let user = await userService.adminSearchUsername(username);
        res.status(200).json(user);
    }catch(e){
        console.log("error in searchUsername:",e )
        res.status(400).json({
            message: 'error in searchUsername',
            success: false
        })
    }}
}
export default new UserController()