import mongoose, { Schema } from 'mongoose';
import { IMessage } from './chat.interface';

const chatSchema = new Schema<IMessage>(
  {
    sender: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model<IMessage>('Chat', chatSchema);
