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
        res.status(201).json({
            success: true,
            data: services
        })
    }
}
export default new ServiceProviderController()