"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Image_1 = require("../entity/Image");
class ImageService {
    constructor() {
        this.all = async (id) => {
            await this.imageRepository.find({
                where: {
                    provider: id
                }
            });
        };
        this.save = async (id, data) => {
            await data.forEach(item => {
                this.imageRepository.save({ provider: id, imageURL: `${item}` });
            });
        };
        this.update = async (id, data) => {
            await this.delete(id);
            await this.save(id, data);
        };
        this.delete = async (idProvider) => {
            await this.imageRepository.delete({
                where: {
                    provider: idProvider
                }
            });
        };
        this.imageRepository = data_source_1.AppDataSource.getRepository(Image_1.Image);
    }
}
exports.default = new ImageService();
//# sourceMappingURL=imageService.js.map