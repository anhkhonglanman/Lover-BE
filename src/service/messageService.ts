
import { AppDataSource } from "../ormconfig";
import { Message } from "../entity/Message";

class MessageService{
    private messageRepository;
    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message)
    }
    all = async (senderId, receiverId) => {
        return await this.messageRepository.find({
            where: [
                { sender: { id: senderId }, receiver: { id: receiverId } },
                { sender: { id: receiverId }, receiver: { id: senderId } }        
            ]
        })
    }
    addMessage = async (body,senderId, conversationId) => {
        const newMessage={
            content : body.content,
            sender:senderId,
            conversation: conversationId            
        }
       let data= await this.messageRepository.save(newMessage);
       return data
    }

}
export default new MessageService()