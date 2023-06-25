import {Request, Response} from "express";
import bookingService from "../service/bookingService";
import providerService from "../service/ProviderService";
const jwt = require('jsonwebtoken');

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
            let token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.decode(token);
            const text = req.params.text
            let booking = await bookingService.find(text,decodedToken.idUser)
            res.status(200).json(booking)
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            })
        }

    }


    findProvides = async (req: Request, res: Response) => {
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.decode(token);
            console.log(decodedToken)
            const text = req.params.text
            let booking = await bookingService.findProvider(text,decodedToken.idUser)
            res.status(200).json(booking)
        } catch (e) {
            res.status(500).json({
                message: 'Có lỗi hệ thống cmnr'
            })
        }

    }

    getDetail = async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = req.params.id
        let detail = await bookingService.detail(id,decodedToken.idUser)
        res.status(200).json({
            data: detail
        })

    }

    getDetailProvider = async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        const id = req.params.id
        let detail = await bookingService.detailProvider(id,decodedToken.idUser)
        res.status(200).json({
            data: detail
        })

    }

    acceptBooking = async (req: Request, res: Response) => {
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.decode(token);
            let bookingId = req.params.bookingId;
            console.log(bookingId)
            const updatedBooking = await bookingService.accept(bookingId, decodedToken.idUser);
            res.status(200).json({
                success: true,
                message: "Booking accepted",
                data: updatedBooking,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }

    rejectBooking = async (req: Request, res: Response) => {
        try {
            let token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.decode(token);
            const bookingId  = req.params.bookingId;

            const updatedBooking = await bookingService.reject(bookingId, decodedToken.idUser);
            res.status(200).json({
                success: true,
                message: "Booking rejected",
                data: updatedBooking,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }


}

export default new BookingController()