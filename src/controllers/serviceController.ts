import {Request, Response} from "express";
import serviceService from "../service/serviceService";
class ServiceController {
    serviceProvider = async (req: Request, res: Response) => {
        // await serviceService.save(req.body)
        // res.status(201).json('tao moi CCDV thanh cong')
    }
}
export default new ServiceController()