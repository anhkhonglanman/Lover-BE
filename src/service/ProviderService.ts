import { Service } from './../entity/Service';
import {AppDataSource} from "../data-source";
import {Provider} from "../entity/Provider";
import { Status } from '../entity/Status';

class ProviderService{
    private providerRepository
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }
    
    createProvider = async (provider) => {
        await this.providerRepository.save(provider)
    }
    getAll = async () => {
        let provider = await this.providerRepository.find({
            relations:{
                user: true,
                service: true,
                
            }
        });
        return provider;
    }
    all = async () => {
        console.log('hi')

       let all = await AppDataSource.getRepository(Status)
        .createQueryBuilder("status")
        .getMany()
        console.log(all);
        return all

    }
    
}
export default new ProviderService()