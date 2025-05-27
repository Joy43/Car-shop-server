import { Chat } from './chat.model';
import { IMessage } from './chat.interface';

const getMessages = async (): Promise<IMessage[]> => {
  return Chat.find().sort({ createdAt: 1 }).exec();
};

const addMessage = async (message: IMessage): Promise<IMessage> => {
  const newMessage = new Chat(message);
  return newMessage.save();
};

export const ChatServices = {
  getMessages,
  addMessage,
};
