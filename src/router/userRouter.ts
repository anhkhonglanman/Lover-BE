import {Router} from 'express'
import userController from "../controllers/userController";
const passport = require('passport');

const userRouter = Router()

userRouter.post('/register', userController.signup);
userRouter.get('/',   passport.authenticate('jwt', { session: false, failWithError: true }),
    userController.allUser);
userRouter.post('/login',userController.login)
userRouter.put('/role/:id',userController.updateToProvider);
userRouter.get('/:id',userController.showUser);
userRouter.put('/:id',userController.editUser);
userRouter.delete('/:id',userController.delete);
userRouter.get('/:name',userController.searchUsername);

export default userRouter
