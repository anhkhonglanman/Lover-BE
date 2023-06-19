import { getRepository } from 'typeorm';
import { Chat } from '../entity/Chat';
import { User } from '../entity/User';
import { AppDataSource } from 'src/ormconfig';

export class ChatService {
  private chatRepository
  constructor() {
    this.chatRepository = AppDataSource.getRepository(Chat)
}

   saveMessage= async(sender: User, receiver: User, content: string)=>{
    const message = new Chat();
    message.sender = sender;
    message.receiver = receiver;
    message.content = content;

    return this.chatRepository.save(message);
  }

  // Các phương thức khác cho xử lý tin nhắn

  // Ví dụ:
   getMessagesByUser= async(userId: number)=> {
    return this.chatRepository.find({
      where: [{ sender: userId }, { receiver: userId }],
      relations: ['sender', 'receiver'],
      order: { id: 'DESC' },
    });
  }
}
