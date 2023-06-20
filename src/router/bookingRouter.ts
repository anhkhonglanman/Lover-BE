import {Router} from "express";
import bookingController from "../controllers/bookingController";

const bookingRouter = Router()
bookingRouter.get('',)
bookingRouter.post('/provider/:id', bookingController.save)
export default bookingRouter