import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";
import serviceRouter from "./serviceRouter";

const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);
router.use('/admin', adminRouter);
router.use('/services', serviceRouter);

export default router