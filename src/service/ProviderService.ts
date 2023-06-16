import {AppDataSource} from "../ormconfig";
import {Provider} from "../entity/Provider";
import { PageMeta, Paginate } from "../lib/paginate";
import { User } from "../entity/User";

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
                // services: true
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
    async findAll(q) {
        const sql = this.providerRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.role', 'r')
            .orderBy('a.createdAt', 'DESC')
            .take(q.take)
            .skip(q.skip);

        if (q.keyword) {
            sql.andWhere(
                `(
        a.name like :keyword
        or a.email like :keyword
        or a.phone like :keyword 
      )`,
                { keyword: `%${q.keyword}%` },
            );
        }
        if (q.permission) {
            sql.andWhere(`(r.name like :permission)`, {
                permission: `%${q.permission}%`,
            });
        }

        if (q.status) {
            sql.andWhere(`a.status = :status`, { status: q.status });
        }

        const [entities, total] = await sql.getManyAndCount();

        const meta = new PageMeta({ options: q, total });

        return entities
    }
}
export default new ProviderService()
