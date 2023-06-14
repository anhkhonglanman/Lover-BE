"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Provider_1 = require("../entity/Provider");
const paginate_1 = require("../lib/paginate");
class ProviderService {
    constructor() {
        this.save = async (provider) => {
            await this.providerRepository.save(provider);
        };
        this.all = async () => {
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
            });
        };
        this.one = async (id) => {
            return await this.providerRepository.findOne({
                where: { id: id },
                relations: {
                    images: true,
                    service: true
                }
            });
        };
        this.searchByType = async (id) => {
            let provider = await this.providerRepository.find({ where: { service: { id: id } },
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
            });
            return (provider);
        };
        this.update = async (id, update) => {
            await this.providerRepository.update({ id: id }, update);
        };
        this.providerRepository = data_source_1.AppDataSource.getRepository(Provider_1.Provider);
    }
    async findAll(q) {
        const sql = this.providerRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.role', 'r')
            .orderBy('a.createdAt', 'DESC')
            .take(q.take)
            .skip(q.skip);
        if (q.keyword) {
            sql.andWhere(`(
        a.name like :keyword
        or a.email like :keyword
        or a.phone like :keyword 
      )`, { keyword: `%${q.keyword}%` });
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
        const meta = new paginate_1.PageMeta({ options: q, total });
        return entities;
    }
}
exports.default = new ProviderService();
//# sourceMappingURL=ProviderService.js.map