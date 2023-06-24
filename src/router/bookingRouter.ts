import {Router} from "express";
import bookingController from "../controllers/bookingController";
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')
const bookingRouter = Router()

bookingRouter.get('', bookingController.all);
bookingRouter.get('/:text', bookingController.find);
bookingRouter.get('/provider/:text', bookingController.findProvides);
bookingRouter.get('/detail/:id', bookingController.getDetail);
bookingRouter.get('/detailProvider/:id', bookingController.getDetailProvider);
bookingRouter.put("/accept/:bookingId", bookingController.acceptBooking);
bookingRouter.put("/reject/:bookingId", bookingController.rejectBooking);
bookingRouter.post('/provider/:id', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsUser(req, res, next, );
    }, bookingController.save)
export default bookingRouter