import {Router} from "express";
import userController from "../controllers/userController";
import userRouter from "./userRouter";

const adminRouter = Router()
adminRouter.get('/find-all', userController.allUser)
adminRouter.put('/lock-user/:id', userController.lockUser)
adminRouter.put('/open-user/:id', userController.openUser)
userRouter.put('/role/:id',userController.updateToProvider);
adminRouter.put('/:id',userController.editUser);
adminRouter.delete('/:id',userController.delete);

export default adminRouter
