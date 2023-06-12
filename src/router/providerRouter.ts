import {Router} from "express";
import providerController from "../controllers/providerController";
import {auth} from "../middleware/auth";
import userController from "../controllers/userController";
import userRouter from "./userRouter";

const providerRouter = Router()

providerRouter.post('/', providerController.save)
providerRouter.get('/', providerController.all)
providerRouter.get('/:id', providerController.showOne)
providerRouter.put('/:id',providerController.editProvider);
providerRouter.get('/service/:id', providerController.searchByTypeProvider)
export default providerRouter
