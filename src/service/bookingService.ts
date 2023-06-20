import {AppDataSource} from "../ormconfig";
import {Booking} from "../entity/Booking";
import {PageMeta} from "../lib/paginate";
import {BookingListPaginated, BookingPaginate} from "../lib/booking-paginate";

class BookingService {
    private bookingRepository

    constructor() {
        this.bookingRepository = AppDataSource.getRepository(Booking)
    }

    save = async (idProvider, req, cost) => {
        let user = req['user'].id
        let booking = {
            address: req.body.address,
            hour: req.body.hour,
            startTime: req.body.startTime,
            cost: cost,
            user: user,
            providers: idProvider,
        }

        return await this.bookingRepository.save(booking)
    }
    all = async () => {
        return await this.bookingRepository.find()
    }
    find = async (q) => {
        const sql = this.bookingRepository
            .createQueryBuilder('b')
            // .leftJoinAndSelect('b.user', 'u')
            .leftJoinAndSelect('b.providers', 'p')
            .orderBy('b.startTime', 'DESC')
            .take(q.take ? q.take : 12)
            .skip(q.skip ? q.skip : 0);

        if (q.keyword) {
            sql.andWhere(
                `(
                b.name like :keyword
                )`,
                {keyword: `%${q.keyword}%`},
            );
        }
        const [entities, total] = await sql.getManyAndCount();

        const meta = new PageMeta({options: q, total});

        return new BookingListPaginated(entities.filter((c) => new BookingPaginate(c)), meta)

    }
    delete = async (id) => {
        await this.bookingRepository.delete({id: id})
    }
}

export default new BookingService()