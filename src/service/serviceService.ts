import {AppDataSource} from "../data-source";
import {Service} from "../entity/Service";

class ServiceService {
    private serviceRepository

    constructor() {
        this.serviceRepository = AppDataSource.getRepository(Service)
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

