import {Request, Response} from "express";
import providerService from "../service/ProviderService";
import userService from "../service/userService";

class ProviderController{
    save =  async (req: Request, res: Response) => {
        try {
            // console.log("-----",req['decode'].id);
            let provider = req.body;
            // provider.user = req['decode'].id
            let newProvider = await providerService.save(provider)
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
        try{
            const query = req.query
            let allProvider = await providerService.all(query)
            res.status(200).json(allProvider)
        }
        catch (e) {
            console.log('Lỗi hệ thống', e)
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            })
        }

    }
    showOne = async (req: Request, res: Response) => {
        let id = req.params.id
        let oneProvider = await providerService.one(id)
        res.status(200).json(oneProvider)
    }
    searchByTypeProvider =  async (req: Request, res: Response) => {
        let id= req.params.id
        let typeProvider = await providerService.searchByType(id)
        res.status(200).json(typeProvider)
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
