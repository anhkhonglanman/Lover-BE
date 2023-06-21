import { id } from 'date-fns/locale';
import {Request, Response} from "express";
import providerService from "../service/ProviderService";
import userService from "../service/userService";
import imageService from "../service/imageService";

class ProviderController {
    save = async (req: Request, res: Response) => {
        try {
            let provider = {
                name : req.body.name,
                dob : req.body.dob,
                sex : req.body.sex,
                city : req.body.city,
                country : req.body.country,
                avatar : req.body.avatar,
                height : req.body.height,
                weight : req.body.weight,
                hobby : req.body.hobby,
                desc : req.body.desc,
                request : req.body.request,
                linkFB : req.body.linkFB,
                price : req.body.price
            }
            let newProvider = await providerService.save(provider)
            let image = req.body.image
            let newImage=await imageService.addImage(image)
            res.status(200).json({
                success: true,
                data: newProvider, newImage
            })
        } catch (e) {
            console.log('tạo người CCDV không thành công', e)
            res.status(400).json({
                success: false,
                message: 'tao provider ko thanh cong'
            })
        }
    }
    all = async (req: Request, res: Response) => {
        try {
            console.log(1)
            const query = req.query
            let allProvider = await providerService.all(query)
            res.status(200).json(allProvider)
        } catch (e) {
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
    acceptUser = async (req: Request, res: Response) => {
        let id  = req.params.id
        const data = await providerService.accept(id)
        res.status(200).json({
            message: true,
            data: data
        })
    }
    rejectUser = async (req: Request, res: Response) => {
        let id  = req.params.id
        const data = await providerService.reject(id)
        res.status(200).json({
            message: true,
            data: data
        })
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
