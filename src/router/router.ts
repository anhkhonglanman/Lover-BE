import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";
import otpRouter from "./otpRouter";
const hasPermissions = require('../middleware/auth')
const passport = require('passport');
const router = Router();

router.use('/users', userRouter);
router.use('/providers', passport.authenticate('jwt', { session: false, failWithError: true }),
(req, res, next) => {
    hasPermissions(req, res, next, );
},providerRouter);
router.use('/admin', passport.authenticate('jwt', { session: false, failWithError: true }),adminRouter);
router.use('/services', passport.authenticate('jwt', { session: false, failWithError: true }),serviceProviderRouter)
router.use('/otp',otpRouter)
export default router