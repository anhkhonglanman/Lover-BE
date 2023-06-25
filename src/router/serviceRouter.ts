import {Router} from "express";
import ServiceController from "../controllers/serviceController";
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')

const serviceRouter = Router()
serviceRouter.get('/', ServiceController.allService);
serviceRouter.get('/:id', ServiceController.getService);

export default serviceRouter;