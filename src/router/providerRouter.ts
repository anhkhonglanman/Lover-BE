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
    providerRouter.put('/privateProvider/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.privateProvider);
    providerRouter.put('/publicProvider/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.publicProvider);
providerRouter.put('/accept/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.acceptUser);
providerRouter.put('/reject/:id',passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsProvider(req, res, next, );
    },providerController.rejectUser);

export default providerRouter
