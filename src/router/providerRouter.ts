import { auth } from './../middleware/auth';
import {Router} from 'express'
import providerController from "../controllers/providerController";
const providerRouter = Router()

providerRouter.get('/', auth,providerController.getAll);

export default providerRouter
