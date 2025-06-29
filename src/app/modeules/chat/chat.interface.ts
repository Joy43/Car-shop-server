export interface IMessage {
  sender: 'admin' | 'user';
  content: string;
  timestamp?: Date;
}
