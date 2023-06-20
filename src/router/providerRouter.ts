import {Router} from "express";
import providerController from "../controllers/providerController";
const hasPermissionsProvider = require('../middleware/CheckRoleProvider')
const passport = require('passport');


const providerRouter = Router()

providerRouter.get('/', providerController.all)
providerRouter.get('/providerDetail/:id', providerController.showOne)
providerRouter.post('/',passport.authenticate('jwt', { session: false, failWithError: true }), providerController.save)

providerRouter.put('/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.editProvider);

export default providerRouter
