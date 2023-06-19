import {Request, Response} from "express";
import ServiceProviderService from "../service/ServiceProviderService";
import {Service} from "../entity/Service";

class ServiceProviderController {
    save = async (req: Request, res: Response) => {
        await ServiceProviderService.save(req.body)
        res.status(201).json('tao CCDV thanh cong')
    }

    find = async (req: Request, res: Response) => {
        let typeId = req.params.id
        let services = await ServiceProviderService.all(typeId)
        let providers = services.map(service => service.provider)
        res.status(201).json(providers)
    }
}
export default new ServiceProviderController()