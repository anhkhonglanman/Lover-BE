import {AppDataSource} from "../ormconfig";
import {Provider} from "../entity/Provider";
import {PageMeta, Paginate} from "../lib/paginate";
import {ProviderListPaginated, ProviderPaginate} from "../lib/provider-paginate";
import {id} from "date-fns/locale";

class ProviderService {
    private providerRepository

    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }

// những function như thế này là thừa không giải quyết vấn đề gì cả
    save = async (req) => {
        const user = req['user'].id
        const provider = await this.providerRepository.create({
            name: req.body.name,
            dob: req.body.dob,
            sex: req.body.sex,
            city: req.body.city,
            country: req.body.country,
            height: req.body.height,
            weight: req.body.weight,
            hobby: req.body.hobby,
            desc: req.body.desc,
            request: req.body.request,
            linkFB: req.body.linkFB,
            count: req.body.body,
            images: req.body.images,
            user: user,
            status: 1
        })
        await this.providerRepository.save(provider)
    }

    all = async (q) => {

        const sql = this.providerRepository
            .createQueryBuilder('a')
            .leftJoinAndSelect('a.user', 'u')
            .leftJoinAndSelect('a.status', 's')
            // .orderBy('a.createdAt', 'DESC')
            // .take(q.take ? q.take : 10)
            // .skip(q.skip ? q.skip : 0);

        if (q.keyword) {
            sql.andWhere(
                `(
        a.name like :keyword
        OR a.city like :keyword
      )`,
                {keyword: `%${q.keyword}%`},
            );
        }


        if (q.sex) {
            sql.andWhere(
                `(a.sex  like :sex)`, {sex: `${q.sex}`}
            )
        }
        if (q.name) {
            sql.andWhere(`(a.name  like :name)`, {name: `%${q.name}%`})
        }
        if (q.city) {
            sql.andWhere(`(p.city  like :city)`, {city: `${q.city}`})
        }
        if (q.country) {
            sql.andWhere(`(p.country  like :country)`, {country: `${q.country}`})
        }


        const [entities, total] = await sql.getManyAndCount();

        const meta = new PageMeta({options: q, total});

        return new ProviderListPaginated(entities.filter((c) => new ProviderPaginate(c)), meta)
    }

//cái này có thể viết gọn hơn
    one = async (id) => {
        return await this.providerRepository.findOne({
            where: {id: id},
            relations: {
                images: true,
                // service: true
            }
        })
    }

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
    update = async (id, update) => {
        await this.providerRepository.update({id: id}, update)
    }

}

export default new ProviderService()
