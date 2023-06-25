import ServiceProviderRouter from "../router/serviceProviderRouter";
import {AppDataSource} from "../ormconfig"
import {Service_provider} from "../entity/Service_provider";
import {Provider} from "../entity/Provider";

class ServiceProviderService {
    private serviceProviderRepository
    private providerRepository
    constructor() {
        this.serviceProviderRepository = AppDataSource.getRepository(Service_provider)
        this.providerRepository = AppDataSource.getRepository(Provider)
    }

    all = async (typeId) => {
        return await this.serviceProviderRepository.find({
            where: {
                service: { id: typeId }
            },
            relations: {
                service: true,
                provider: true
            }
        })
    }
    addService = async (providerId,data) => {
        await data.forEach(item => {
            this.serviceProviderRepository.save({provider: providerId, service: `${item}`})
        })
    }
    one = async (id) => {
        return await this.serviceProviderRepository.find({
            where: {
                id: id
            },
            relations: {
                provider: {
                    user: true
                },
                service: true
            }
        })
    }
}

export default new ServiceProviderService()