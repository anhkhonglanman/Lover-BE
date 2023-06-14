import {Router} from "express";
import providerController from "../controllers/providerController";
import {auth} from "../middleware/auth";

const providerRouter = Router()

providerRouter.post('/', providerController.save)
providerRouter.get('/', providerController.all)
providerRouter.get('/:id', providerController.showOne)
providerRouter.put('/:id',providerController.editProvider);

export default providerRouter
