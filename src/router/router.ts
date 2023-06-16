import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";
import otpRouter from "./otpRouter";

const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);
router.use('/admin', adminRouter);
router.use('/services', serviceProviderRouter)
router.use('/otp',otpRouter)
export default router