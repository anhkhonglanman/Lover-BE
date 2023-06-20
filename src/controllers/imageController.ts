import imageService from "../service/imageService";
import {Request, Response} from "express";

class ImageController {
    all =  async (req: Request, res: Response) => {
        try{
            let idProvider = req.params.idProvider
            let allProvider = await imageService.all(idProvider)
            res.status(200).json(allProvider)
        }
        catch (e) {
            res.status(500).json({
                message: 'k show đc ảnh'
            })
        }
    }
    save =  async (req: Request, res: Response) => {
        try {
            let idProvider = req.params.idProvider;
            let data = req.body
            let newImage = await imageService.save(idProvider, data)
            res.status(200).json({
                success: true,
                data: newImage
            })
        } catch (e) {
            console.log('thêm ảnh thành công', e)
            res.status(400).json({
                success: false,
                message: 'thêm ảnh ko thành công'
            })
        }
    }
    editImage = async (req: Request, res: Response) => {
        let idProvider = req.params.idProvider;
        let data = req.body
        let newImage = await imageService.update(idProvider, data)
        res.status(200).json({
            success: true,
            data: newImage,
            message: 'edit ảnh thành công'

        })
    }
    deleteImage = async (req: Request, res: Response) => {
        try{
        let id = req.params.id
        await imageService.delete(id)
        res.status(200).json('xoa thanh cong')
    }catch(e){
        console.log("error in deleteInmage:",e )
        res.status(400).json({
            message: 'error in deleteInmage',
            success: false
        })
    }
    }

}

export default new ImageController();