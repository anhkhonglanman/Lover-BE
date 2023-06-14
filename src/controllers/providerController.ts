import {Request, Response} from "express";
import providerService from "../service/ProviderService";
import userService from "../service/userService";

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
    showOne = async (req: Request, res: Response) => {
        let id = req.params.id
        let oneProvider = await providerService.one(id)
        res.status(200).json(oneProvider)
    }
 
    editProvider = async (req: Request, res: Response) => {
        let provider = req.body;
        let id = req.params.id;
        let newProvider = await providerService.update(id, provider)
        res.status(200).json({
            success: true,
            data: newProvider
        })
    }
}
export default new ProviderController()