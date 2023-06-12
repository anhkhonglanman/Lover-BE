import {Router} from "express";
import userRouter from "./userRouter";
import providerRouter from "./providerRouter";

const router = Router();

router.use('/users', userRouter);
router.use('/providers', providerRouter);

export default router