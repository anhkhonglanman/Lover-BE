import ServiceProviderRouter from "../router/serviceProviderRouter";
import {AppDataSource} from "../ormconfig"
import {Service_provider} from "../entity/Service_provider";

class ServiceProviderService {
    private serviceProviderRepository

    constructor() {
        this.serviceProviderRepository = AppDataSource.getRepository(Service_provider)
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
        await data.forEach(item=>{
            this.serviceProviderRepository.save({provider : providerId ,service:`${item}`})
        })
    }
}

export default new ServiceProviderService()