import {AppDataSource} from "../ormconfig";
import {Booking} from "../entity/Booking";
import providerService from "./ProviderService";
import {sync} from "rimraf";

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
        return  await this.bookingRepository.find()
    }
    delete = async (id) => {
        await this.bookingRepository.delete({id: id})
    }
}

export default new BookingService()