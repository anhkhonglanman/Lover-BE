import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceProviderRouter from "./serviceProviderRouter";

const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);
router.use('/admin', adminRouter);
router.use('/services', serviceProviderRouter)
export default router