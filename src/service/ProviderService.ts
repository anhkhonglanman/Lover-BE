import {AppDataSource} from "../data-source";
import {Provider} from "../entity/Provider";

class ProviderService{
    private providerRepository
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }

    save = async (provider) => {
        await this.providerRepository.save(provider)
    }
    all = async () => {
        return await this.providerRepository.find({
            relations: {
                images: true,
                // services: true,
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
        })
    }

    one = async (id) => {
        return  await this.providerRepository.findOne({
            where : {id: id},
            relations: {
                images: true,
                user: true
                // services: true
            },
            select: {
                user: {
                    firstname: true,
                    lastname: true,
                    phoneNumber: true
                }
            }
        })
    }
    searchByType = async (id) => {
        let provider = await this.providerRepository.find({where: {services: {id: id}},
            relations:{
                images: true,
                services: true,
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
        })
        return(provider);
    }
    update = async (id, update) => {
        await this.providerRepository.update({id: id}, update)
    }
}
export default new ProviderService()