import {Request, Response} from "express";
import messageService from "../service/messageService";
const jwt = require('jsonwebtoken')


class MessageController {
    private messageService
    constructor() {
        this.messageService = messageService
    }
    getMessage = async (req: Request, res: Response) => {
        const receiverId = req.params.id;
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let senderId = decodedToken.idUser
        const message = await messageService.all(senderId,receiverId );
        if (!message) {
            return res.status(404).json({ message: 'Service not found' });
        }
        return res.status(200).json(message);
    }
    addMessage =async (req: Request, res: Response) => {
        let token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.decode(token);
        let message = req.body
        let senderId = decodedToken.idUser
        let receiverId = req.params.id
        let newMessage = await messageService.addMessage(message, senderId,receiverId ) 
        res.status(200).json({
        success: true,
        data: newMessage
        })
    }
}
export default new MessageController();