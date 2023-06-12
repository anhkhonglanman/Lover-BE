import {Router} from "express";
import providerController from "../controllers/providerController";

const providerRouter = Router()

providerRouter.post('/', providerController.save)
providerRouter.get('/', providerController.all)
providerRouter.get('/:id', providerController.searchByTypeProvider)
providerRouter.get('/:id', providerController.findIdProvider)

export default providerRouter