import {AppDataSource} from "../data-source";
import {Provider} from "../entity/Provider";

class ServiceService {
    private providerRepository
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }
    save = async (data) => {
        await this.providerRepository.save(data)
    }
}

export default new ServiceService()