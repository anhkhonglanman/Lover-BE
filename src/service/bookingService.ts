import {AppDataSource} from "../ormconfig";
import {Booking} from "../entity/Booking";
import {PageMeta} from "../lib/paginate";
import {BookingListPaginated, BookingPaginate} from "../lib/booking-paginate";
import {id} from "date-fns/locale";

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
    detail = async (id,idUser) => {
        return await this.bookingRepository.findOne({
            where:{
                id: id,
                user: {
                    id: idUser
                }
            },
            relations: {
                providers: true,
            }
        })
    }
    find = async (text, idUser) => {
        return await this.bookingRepository.find({
            where: {
                status: text,
                user: {
                    id: idUser
                }
            }

        })
    }


    findProvider = async (text, idProvider) => {
        return await this.bookingRepository.find({
            where: {
                status: text,
                providers: {
                    id: idProvider
                }
            },
            relations: {
                user: true,
            }
        })
    }

    detailProvider = async (id,idProvider) => {
        return await this.bookingRepository.findOne({
            where:{
                id: id,
                providers: {
                    id: idProvider
                }
            },
            relations: {
                user: true,
            }
        })
    }

    delete = async (id) => {
        await this.bookingRepository.delete({id: id})
    }

    accept = async (bookingId, idProvider) => {
        const booking = await this.bookingRepository.findOne({
            where:{
                id: bookingId,
                providers: idProvider
            }
        });
        if(!booking){
            throw new Error("Booking not found");
        }

        if(booking.status !== "pending"){
            throw new Error("Booking i not in pending status");
        }

        booking.status = "accept";
        return await this.bookingRepository.save(booking);
    }


    reject = async (bookingId,idProvider) => {
        const booking = await this.bookingRepository.findOne({
            where: {
                id:bookingId,
                providers: idProvider
            }
            });
        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.status !== "pending") {
            throw new Error("Booking is not in pending status");
        }

        booking.status = "reject";
        return await this.bookingRepository.save(booking);
    }




}

export default new BookingService()