import {Router} from "express";
import providerController from "../controllers/providerController";


const providerRouter = Router()

providerRouter.post('/', providerController.save)
providerRouter.get('/', providerController.all)
providerRouter.get('/providerDetail/:id', providerController.showOne)
providerRouter.put('/:id',providerController.editProvider);

export default providerRouter
