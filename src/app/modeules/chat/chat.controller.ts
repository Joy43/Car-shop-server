import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendRequest';
import { ChatServices } from './chat.service';
import status from 'http-status';

// --------------- Add Message---------------------
const addMessage = catchAsync(async (req: Request, res: Response) => {
  const { sender, content } = req.body;

  if (!sender || !content) {
    return sendResponse(res, {
      statusCode: status.BAD_REQUEST,
      success: false,
      message: 'Sender and content are required',
      data: null,
    });
  }

  const result = await ChatServices.addMessage({ sender, content });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Message sent successfully',
    data: result,
  })
});

//---------------------- Get All Messages--------------------
const getMessages = catchAsync(async (req: Request, res: Response) => {
  const result = await ChatServices.getMessages();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Messages retrieved successfully',
    data: result,
  });
});

export const ChatController = {
  addMessage,
  getMessages,
};
