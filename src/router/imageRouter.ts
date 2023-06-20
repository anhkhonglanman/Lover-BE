import {Router} from "express";
import imageController from "src/controllers/imageController";

const imageRouter = Router()
imageRouter.get('/:idProvider', imageController.all)
imageRouter.post('/:idProvider', imageController.save)
imageRouter.put('/:idProvider', imageController.editImage)
imageRouter.put('/:idProvider', imageController.deleteImage)


export default imageRouter