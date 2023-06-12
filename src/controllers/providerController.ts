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
    searchByTypeProvider =  async (req: Request, res: Response) => {
        let id= req.params.id
        let typeProvider = await providerService.searchByType(id)
        res.status(200).json(typeProvider)
    }
    findIdProvider = async (req: Request, res: Response) => {
        let id = req.params.id;
        try {
            let provider = await this.providerService.findByIdPost(id);
            res.status(200).json({
                data: provider,
                success: true
            })
        } catch (e) {
            console.log("error find id in post controller", e)
            res.status(500).json({
                message: 'id not found',
                success: false
            })
        }

    }
    providerService: any;
   }
export default new ProviderController()