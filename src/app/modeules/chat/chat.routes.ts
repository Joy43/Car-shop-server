import express from 'express';
import { ChatController } from './chat.controller';

const router = express.Router();

router.get('/', ChatController.getMessages);
router.post('/', ChatController.addMessage);

export const MessageRoute=router;
