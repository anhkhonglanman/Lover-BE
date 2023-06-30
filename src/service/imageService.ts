import {AppDataSource} from "../ormconfig";
import { Image } from "../entity/Image";
class ImageService{
    private imageRepository;
    constructor() {
        this.imageRepository = AppDataSource.getRepository(Image)
    }
    async addImage(providerId, data) {
        for (const item of data) {
          await this.imageRepository.save({ provider: providerId, imageURL: item });
        }
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