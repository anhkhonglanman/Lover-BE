import { Conversation } from './../entity/Conversation';
import { AppDataSource } from "../ormconfig";

class ConversationService{
    private conversationRepository;
    constructor() {
        this.conversationRepository = AppDataSource.getRepository(Conversation)
    }
    all = async (senderId, receiverId) => {
        return await this.conversationRepository.find({
            where: [
                { sender: { id: senderId }, receiver: { id: receiverId } },
                { sender: { id: receiverId }, receiver: { id: senderId } }        
            ]
        })
    }
    addConversation = async (user1,user2) => {
        const newConversation={
            user1:user1,
            user2: user2
        }
       let data= await this.conversationRepository.save(newConversation);
       return data
    }
    check = async (user1, user2) => {
        const findConversation = await this.conversationRepository.findOne({
             where:  [
                { user1: { id: user1 }, user2: { id: user2 } },
                { user1: { id: user2 }, user2: { id: user1 } }        
            ]
            });
        return !findConversation; // Trả về true nếu không tìm thấy otp có owner trùng
      };

}
export default new ConversationService()