import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";
import adminRouter from "./adminRouter";

const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);
router.use('/admin', adminRouter);

export default router