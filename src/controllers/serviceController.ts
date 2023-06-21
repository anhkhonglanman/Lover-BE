import {Request, Response} from "express";
import serviceService from "../service/serviceService";

class ServiceController{

    getService = async (req: Request, res: Response) => {
        const idType = req.params.id;
        const service = await serviceService.getByIdService(idType);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json(service);
    }

}
export default new ServiceController()