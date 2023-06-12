import {AppDataSource} from "../data-source";
import {Provider} from "../entity/Provider";

class ProviderService{
    private providerRepository
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }

    createProvider = async (provider) => {
        await this.providerRepository.save(provider)
    }
}
export default new ProviderService()