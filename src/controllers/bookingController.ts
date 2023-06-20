import {Request, Response} from "express";
import bookingService from "../service/bookingService";
import providerService from "../service/ProviderService";
import {id} from "date-fns/locale";

class BookingController{

    save = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let provider = await providerService.one(id)
            let idProvider = provider.id
            let price = provider.price
            let cost = parseInt(price) * parseInt(req.body.hour)
            let booking = await bookingService.save(idProvider, req, cost)
            res.status(200).json({
                message: "tao thanh cong",
                data: booking
            })
        } catch (e) {
            console.log('tạo contract không thành công', e)
            res.status(400).json({
                success: false,
                message: 'tao contract ko thanh cong'
            })
        }

    }
}

export default new BookingController()