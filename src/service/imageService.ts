import {AppDataSource} from "../ormconfig";
import { Image } from "../entity/Image";
class ImageService{
    private imageRepository;
    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }
    addImage = async (providerId,data) => {
        await data.forEach(item=>{
            this.imageRepository.save({provider : providerId ,imageURL:`${item}`})
        })
    }
    deleteOneImage = async (id) => {
        await this.imageRepository.delete(id)
    }
    deleteImageById = async (providerId) => {
        await this.imageRepository
            .createQueryBuilder('Provider')
            .delete()
            .where({ provider: providerId })
            .execute();
    }
    upDateImage = async (providerId,data) => {
        console.log('update image')
        await this.deleteImageById(providerId);
        await this.addImage(providerId,data)
    }

    deleteAllImageByProvidertId = async (id) => {
        await this.imageRepository.createQueryBuilder()
            .delete()
            .from(Image)
            .where("provider = :provider", { provider: id })
            .execute()
    }
}
export default new ImageService()