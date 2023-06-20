import {Router} from "express";
import bookingController from "../controllers/bookingController";


const bookingRouter = Router()

bookingRouter.post('/', bookingController.booking)
bookingRouter.post('/agreeToRent/:id', bookingController.agreeToRent)

export default bookingRouter
