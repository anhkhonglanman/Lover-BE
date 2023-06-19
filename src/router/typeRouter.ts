import {Router} from "express";
import TypeController from "../controllers/typeController";

const TypeRouter = Router()
TypeRouter.get('/', TypeController.getType);

export default TypeRouter;
