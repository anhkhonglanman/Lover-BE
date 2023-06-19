import {Router} from "express";
import ServiceController from "../controllers/serviceController";


const serviceRouter = Router()
serviceRouter.get('/:id', ServiceController.getService);

export default serviceRouter;