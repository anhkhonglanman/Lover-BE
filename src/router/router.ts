import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";
import otpRouter from "./otpRouter";
import imageRouter from "./imageRouter";
const hasPermissionsAdmin = require('../middleware/CheckRoleAdmin')
const hasPermissionsProvider = require('../middleware/CheckRoleProvider')
const hasPermissionsUser = require('../middleware/checkRoleUser')
const passport = require('passport');
const router = Router();

router.use('/users', userRouter);
router.use('/providers', passport.authenticate('jwt', { session: false, failWithError: true }),
(req, res, next) => {
    hasPermissionsProvider(req, res, next, );
},providerRouter);
router.use('/images', passport.authenticate('jwt', { session: false, failWithError: true }),
(req, res, next) => {
    hasPermissionsProvider(req, res, next, );
},imageRouter);
router.use('/admin', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsAdmin(req, res, next, );
    },adminRouter);
router.use('/services', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsUser(req, res, next, );
    },serviceProviderRouter)
router.use('/otp',otpRouter)
export default router