import {Router} from "express";
import serviceController from "../controllers/serviceController";

const serviceRouter = Router()
serviceRouter.post('/', serviceController.serviceProvider)
serviceRouter.get('/types/:id')
export default serviceRouter