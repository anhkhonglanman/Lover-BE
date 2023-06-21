import {Router} from "express";
import bookingController from "../controllers/bookingController";
const passport = require('passport');
const hasPermissionsUser = require('../middleware/checkRoleUser')
const bookingRouter = Router()

bookingRouter.get('', bookingController.all)
bookingRouter.get('/sort', bookingController.find)
bookingRouter.post('/provider/:id', passport.authenticate('jwt', { session: false, failWithError: true }),
    (req, res, next) => {
        hasPermissionsUser(req, res, next, );
    }, bookingController.save)
export default bookingRouter