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
                service : {
                    type : {
                        id: typeId
                    }
                }
            }
        })
    }
    save = async (data) => {
        await this.serviceProviderRepository.save(data)
    }
}

export default new ServiceProviderService()