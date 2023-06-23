import {Router} from "express";
import ServiceProviderController from "../controllers/ServiceProviderController";

const ServiceProviderRouter = Router()
ServiceProviderRouter.get('/type/:id', ServiceProviderController.find)
export default ServiceProviderRouter