import { Request, Response } from "express";
import ProviderService from "../service/ProviderService";
class ProviderController {
    getAll = async (req: Request, res: Response) => {
        let all = await ProviderService.all()
        return res.json(all)
    }
}

export default new ProviderController()