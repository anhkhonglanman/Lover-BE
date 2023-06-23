import {Router} from "express";
import ServiceController from "../controllers/serviceController";
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')

const serviceRouter = Router()
serviceRouter.get('/', ServiceController.allService);
serviceRouter.get('/:id', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsUser(req, res, next, );
    }, ServiceController.getService);

export default serviceRouter;