import {Image} from "../entity/Image";
import { AppDataSource } from "../ormconfig";

class ImageService{
    private imageRepository
    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }
    all = async (id) => {
        await this.imageRepository.find({
            where : {
                provider: id
            }
        })
    }
    save = async (id, data) => {
        await data.forEach(item => {
            this.imageRepository.save({provider: id, imageURL: `${item}`})
        })
    }
    update = async (id, data) => {
        await this.delete(id)
        await this.save(id, data)
    }
    delete = async (idProvider) => {
        await this.imageRepository.delete({
            where: {
                provider: idProvider
            }
        })
    }
}

export default new ImageService()
