import { Booking } from "src/entity/Booking";
import { AppDataSource } from "src/ormconfig";


class BookingService{
    private bookingRepository
    constructor() {
        this.bookingRepository = AppDataSource.getRepository(Booking)
    }
   
        save = async (data) => {
            return await this.bookingRepository.save(data);
        }
        status =  async (id) => {
            let status = await this.bookingRepository.findOneBy({status: 1})
            await this.bookingRepository.update({id: id}, {isLocked: status})
        }
        
}
export default new BookingService()
