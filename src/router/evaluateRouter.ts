import {Router} from "express";
import evaluateController from "../controllers/evaluateController";

const evaluzteRouter = Router()
evaluzteRouter.post('/:id', evaluateController.addEvaluate)
export default evaluzteRouter