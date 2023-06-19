import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";
import otpRouter from "./otpRouter";
import typeRouter from "./typeRouter";
import serviceRouter from "./serviceRouter";
const hasPermissionsAdmin = require('../middleware/CheckRoleAdmin')
const hasPermissionsProvider = require('../middleware/CheckRoleProvider')
const hasPermissionsUser = require('../middleware/checkRoleUser')
const passport = require('passport');
const router = Router();

router.use('/users', userRouter);
router.use('/providers',providerRouter);
router.use('/admin', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsAdmin(req, res, next, );
    },adminRouter);
router.use('/serviceProvider',serviceProviderRouter);
router.use('/otp',otpRouter);
router.use('/type',typeRouter);
router.use('/services',serviceRouter);
export default router