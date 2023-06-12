<<<<<<< HEAD
import { Request, Response } from "express";
import ProviderService from "../service/ProviderService";
class ProviderController {
    getAll = async (req: Request, res: Response) => {
        let all = await ProviderService.all()
        return res.json(all)
    }
}

=======
import {Request, Response} from "express";
import providerService from "../service/ProviderService";

class ProviderController{
    save =  async (req: Request, res: Response) => {
        try {
            let newProvider = await providerService.save(req.body)
            res.status(200).json({
                success: true,
                data: newProvider
            })
        } catch (e) {
            console.log('tạo người CCDV không thành công', e)
            res.status(400).json({
                success: false,
                message: 'tao provider ko thanh cong'
            })
        }
    }
    all =  async (req: Request, res: Response) => {
        let allProvider = await providerService.all()
        res.status(200).json(allProvider)
    }
}
>>>>>>> 396721c03a72678ffd6af16407739aa43960affd
export default new ProviderController()