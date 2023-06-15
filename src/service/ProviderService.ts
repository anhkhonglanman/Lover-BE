import { AppDataSource } from "../ormconfig";
import { Provider } from "../entity/Provider";
import { PageMeta, Paginate } from "../lib/paginate";
import { User } from "../entity/User";
import { ProviderListPaginated, ProviderPaginate } from "../lib/provider-paginate";

class ProviderService {
    private providerRepository

    constructor() {
        this.providerRepository = AppDataSource.getRepository(Provider)
    }
// những function như thế này là thừa không giải quyết vấn đề gì cả
    save = async (provider) => {
        await this.providerRepository.save(provider)
    }

    all = async (q) => {
        //ở đây có thêm các câu query join với các bảng
        //LƯU Ý việc sử dụng này nếu ở 2 bảng nhiều nhiều hoặc một nhiều sẽ có thể khác tuỳ tình huống
        const sql = this.providerRepository
            .createQueryBuilder('a')
            // .leftJoinAndSelect('a.user', 'r')
            // .orderBy('a.createdAt', 'DESC')
            .take(q.take ? q.take : 10)
            .skip(q.skip ? q.skip : 1);



        //search keyword
        if (q.keyword) {
            sql.andWhere(
                `(
        a.name like :keyword
        OR a.city like :keyword
      )`,
                {keyword: `%${q.keyword}%`},
            );
        }

        //search giới tính
        if (q.sex) {
            sql.andWhere(
                `(a.sex  like :sex)`, {sex: `${q.sex}`}
            )
        }

        const [entities, total] = await sql.getManyAndCount();

        // tính  bản ghi
        const meta = new PageMeta({options: q, total});

        //phân trang và chuẩn hoá dữ liệu đầu ra
        return new ProviderListPaginated(entities.filter((c) => new ProviderPaginate(c)), meta)
    }

//cái này có thể viết gọn hơn
    one = async (id) => {
        return await this.providerRepository.findOne({
            where: {id: id},
            relations: {
                images: true,
                service: true
            }
        })
    }

    //không ai viết ntn cả =))))), không tái sử dụng được
    searchByType = async (id) => {
        let provider = await this.providerRepository.find({
            where: {service: {id: id}},
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
        return (provider);
    }
//thừa
    update = async (id, update) => {
        await this.providerRepository.update({id: id}, update)
    }

}

export default new ProviderService()
