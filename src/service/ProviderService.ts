import { Service } from './../entity/Service';
import {AppDataSource} from "../data-source";
import {Provider} from "../entity/Provider";
import { Status } from '../entity/Status';

class ProviderService{
    private providerRepository
    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }
<<<<<<< HEAD
    
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
    
=======

    save = async (provider) => {
        await this.providerRepository.save(provider)
    }
    all = async () => {
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
        })
    }
>>>>>>> 396721c03a72678ffd6af16407739aa43960affd
}
export default new ProviderService()