import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";
import otpRouter from "./otpRouter";
import bookingRouter from "./bookingRouter";
import typeRouter from "./typeRouter";
const hasPermissionsAdmin = require('../middleware/CheckRoleAdmin')
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')
const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);
router.use('/admin', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsAdmin(req, res, next, );
    },adminRouter);
router.use('/services', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsUser(req, res, next, );
    },serviceProviderRouter)
router.use('/service-provider',serviceProviderRouter)
router.use('/bookings',bookingRouter)
router.use('/type',typeRouter)
router.use('/otp',otpRouter)
export default router