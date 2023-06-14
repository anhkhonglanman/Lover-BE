import {Router} from 'express'
import userController from "../controllers/userController";
import {auth} from "../middleware/auth";
const userRouter = Router()

userRouter.post('/register', userController.signup);
userRouter.get('/', userController.allUser);
userRouter.post('/login',userController.login)
userRouter.put('/role/:id',userController.updateToProvider);
userRouter.get('/:id', auth,userController.showUser);
userRouter.put('/:id', auth,userController.editUser);
userRouter.delete('/:id', auth,userController.delete);
userRouter.get('/:name', auth,userController.searchUsername);

export default userRouter
