import {AppDataSource} from "../ormconfig";
import {Service} from "../entity/Service";

class ServiceService {
    private serviceRepository

    constructor() {
        this.serviceRepository = AppDataSource.getRepository(Service)
    }
    all = async () => {
        return await this.serviceRepository.find()
    }
    getByIdService = async (idType) => {
        const service = await this.serviceRepository.find(
            {
                where: {
                    type: {
                        id :idType
                    }
                },
                relations: ['type'],
            }
        );
        return service;
    }

}

export default new ServiceService();

