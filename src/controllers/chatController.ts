import { Socket } from 'socket.io';
import {User} from "../entity/User"
import { ChatService } from '../service/chatService';

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  handleConnection(socket: Socket) {
    console.log('A user connected');

    socket.on('chat message', async (messageData: { senderId: number, receiverId: number, content: string }) => {
      console.log('Message:', messageData);

      try {
        let { senderId, receiverId, content } = messageData;

        // Lấy thông tin người gửi và người nhận từ cơ sở dữ liệu
        let sender = await User.findOne(senderId);
        if (!sender) throw new Error('Sender not found');

        let receiver = await User.findOne(receiverId);
        if (!receiver) throw new Error('Receiver not found');

        // Lưu tin nhắn vào cơ sở dữ liệu
        let message = await this.chatService.saveMessage(sender, receiver, content);

        // Gửi tin nhắn tới tất cả các kết nối khác
        socket.broadcast.emit('chat message', message);
      } catch (error) {
        console.error('Error saving message:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  }
}
