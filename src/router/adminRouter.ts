import {Router} from "express";
import userController from "../controllers/userController";
import {auth} from "../middleware/auth";

const adminRouter = Router()
adminRouter.put('/lock-user/:id', userController.lockUser)
adminRouter.put('/open-user/:id', userController.openUser)
adminRouter.put('/:id', auth,userController.editUser);
adminRouter.delete('/:id', auth,userController.delete);

export default adminRouter