import { AppDataSource } from "../ormconfig";
import { Provider } from "../entity/Provider";
import { PageMeta, Paginate } from "../lib/paginate";
import { ProviderListPaginated, ProviderPaginate } from "../lib/provider-paginate";
import { Image } from "../entity/Image";
import {Booking} from "../entity/Booking";

class ProviderService {
    private providerRepository

    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }
// những function như thế này là thừa không giải quyết vấn đề gì cả
    save = async (provider, user) => {
        const newProvider={
            name : provider.name,
            dob: provider.dob,
            sex: provider.sex,
            city: provider.city,
            avatar: provider.avatar,
            country: provider.country,
            height: provider.height,
            weight: provider.weight,
            hobby: provider.hobby,
            desc: provider.desc,
            request: provider.request,
            linkFB: provider.linkFB,
            count: provider.count,
            images: provider.images,
            user: user,
            status: 1
        }
       let data= await this.providerRepository.save(newProvider);
       return data
    }


    all = async (q) => {
        const sql = this.providerRepository
          .createQueryBuilder("p")
          .leftJoinAndSelect("p.user", "u")
          .leftJoinAndSelect("p.status", "s")
          .leftJoinAndSelect('p.images', 'images')
          .leftJoinAndSelect("p.serviceProviders", "sp")
          .take(q.take ? q.take : 12)
          .skip(q.skip ? q.skip : 0);
      
        if (q.keyword) {
          sql.andWhere(`(
            p.name like :keyword
            OR p.city like :keyword
          )`, { keyword: `%${q.keyword}%` });
        }
      
        if (q.sex) {
          sql.andWhere(`(p.sex like :sex)`, { sex: `${q.sex}` });
        }
      
        if (q.name) {
          sql.andWhere(`(p.name like :name)`, { name: `${q.name}` });
        }
        if (q.city) {
          sql.andWhere(`(p.city like :city)`, { city: `${q.city}` });
        }
        if (q.country) {
          sql.andWhere(`(p.country like :country)`, { country: `${q.country}` });
        }
      
        const [entities, total] = await sql.getManyAndCount();
      
        const meta = new PageMeta({ options: q, total });
      
        return new ProviderListPaginated(entities.map((c) => new ProviderPaginate(c, c.user, c.images, c.serviceProviders, c.service)), meta);
      }
      
//cái này có thể viết gọn hơn
one = async (id) => {
    return await this.providerRepository.findOne({
      where: { id: id },
      relations: ['images', 'serviceProviders', 'serviceProviders.service' ],
    });
  };
    //không ai viết ntn cả =))))), không tái sử dụng được
    searchByType = async (id) => {
        let provider = await this.providerRepository.find({
            where: {service: {id: id}},
            relations: {
                images: true,
                // service: true,
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
        return (provider);
    }
    accept = async (id) => {
        return await AppDataSource.getRepository(Booking)
            .update({id : id}, {status: "accept"})
    }
    reject = async (id) => {
        return await AppDataSource.getRepository(Booking)
            .update({id : id}, {status: "reject"})
    }
    update = async (id, update) => {
        await this.providerRepository.update({id: id}, update)
    }
    private =  async (id) => {
        let ready = await this.providerRepository.findOneBy({ready: 1})
        await this.providerRepository.update({id: id}, {statusContent: ready})
    }
    public =  async (id) => {
        await this.providerRepository.update({id}, {ready: 0});
        return {id, ready: 0}
    }
    forRent =  async (id) => {
        await this.providerRepository.update({id}, {ready: 2});
        return {id, ready: 2}
    }
}

export default new ProviderService()
