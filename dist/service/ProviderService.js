"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Provider_1 = require("../entity/Provider");
class ProviderService {
    constructor() {
        this.save = async (provider) => {
            await this.providerRepository.save(provider);
        };
        this.all = async () => {
            return await this.providerRepository.find({
                relations: {
                    images: true,
                    service: true,
                    user: true,
                    status: true
                },
                select: {
                    user: {
                        firstname: true,
                        lastname: true,
                        phoneNumber: true
                    }
                }
            });
        };
        this.one = async (id) => {
            return await this.providerRepository.findOne({
                where: { id: id },
                relations: {
                    images: true,
                    service: true
                }
            });
        };
        this.searchByType = async (id) => {
            let provider = await this.providerRepository.find({ where: { service: { id: id } },
                relations: {
                    images: true,
                    service: true,
                    user: true,
                    status: true
                },
                select: {
                    user: {
                        firstname: true,
                        lastname: true,
                        phoneNumber: true
                    }
                }
            });
            return (provider);
        };
        this.update = async (id, update) => {
            await this.providerRepository.update({ id: id }, update);
        };
        this.providerRepository = data_source_1.AppDataSource.getRepository(Provider_1.Provider);
    }
}
exports.default = new ProviderService();
//# sourceMappingURL=ProviderService.js.map