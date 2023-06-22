import {Request, Response} from "express";
import bookingService from "../service/bookingService";
import providerService from "../service/ProviderService";

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
                data: booking
            })
        } catch (e) {
            res.status(400).json({
                success: false,
                message: 'tao contract ko thanh cong'
            })
        }
    }

    all = async (req: Request, res: Response) => {
        let data = await bookingService.all()
        res.status(200).json({
            data: data
        })
    }
    find = async (req: Request, res: Response) => {
        try {
            const text = req.params.text
            // const query = req.query
            let booking = await bookingService.find(text)
            res.status(200).json(booking)
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            })
        }

    }
    getDetail = async (req: Request, res: Response) => {
        const id = req.params.id
        let detail = await bookingService.detail(id)
        res.status(200).json({
            data: detail
        })

    }
}

export default new BookingController()