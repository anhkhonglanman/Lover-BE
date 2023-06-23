import {Request, Response} from "express";
import ServiceProviderService from "../service/ServiceProviderService";
import {Service} from "../entity/Service";
import jwt from "jsonwebtoken";

class ServiceProviderController {

    find = async (req: Request, res: Response) => {
        let typeId = req.params.id
        let services = await ServiceProviderService.all(typeId)
        let providers = services.map(service => service.provider)
        res.status(201).json(providers)
    }

    getOne = async (req: Request, res: Response) => {
        console.log(req)
        let id = req.params.id

        let one = await ServiceProviderService.one(id)
        res.status(200).json({
            data: one
        })
    }
}
export default new ServiceProviderController()