import {Router} from 'express'
import userController from "../controllers/userController";
import {auth} from "../middleware/auth";
const userRouter = Router()

userRouter.post('/register', userController.signup);
userRouter.get('/', userController.allUser);
userRouter.post('/login',userController.login)
userRouter.put('/role/:id',userController.updateToProvider);
userRouter.get('/:id', auth,userController.showUser);
userRouter.delete('/:name', auth,userController.searchUsername);

export default userRouter
