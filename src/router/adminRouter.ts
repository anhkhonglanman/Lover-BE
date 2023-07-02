import {Router} from "express";
import userController from "../controllers/userController";
import passport from "passport";
const hasPermissionsAdmin = require('../middleware/CheckRoleAdmin');

const adminRouter = Router()
adminRouter.get('/find-all', userController.allUser)
adminRouter.put('/lock-user/:id', userController.lockUser)
adminRouter.put('/open-user/:id', userController.openUser)
adminRouter.put('/role/:id',userController.updateToProvider);
adminRouter.put('/:id',userController.editUser);
adminRouter.delete('/:id',userController.delete);
adminRouter.get('/allUser-vip', passport.authenticate('jwt', {session: false, failWithError: true}),
    (req, res, next) => {
        hasPermissionsAdmin(req, res, next,);
    }, userController.allUsers)

export default adminRouter
