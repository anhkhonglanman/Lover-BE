import BookingService from "../service/bookingService";
import {Request, Response} from "express";

class BookingController{
    booking = async (req: Request, res: Response) => {
        try{
            let id = parseInt(req["decode"].idUser)
            req.body.user = id;
            req.body.status= 0;
            let data = req.body;
            let booking = await BookingService.save(data)
            res.status(200).json(booking);
        }catch(e){
            res.status(400).json({
                message: 'err',
                success: false
            })
        }}
        agreeToRent = async (req: Request, res: Response) => {
            let userId = req.params.id
            let agree = await BookingService.status(userId)
            res.status(200).json({
                message: 'Đồng ý cho thuê',
                data: agree
            })
        }

}
export default new BookingController()
