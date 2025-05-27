"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServices = void 0;
const chat_model_1 = require("./chat.model");
const getMessages = async () => {
    return chat_model_1.Chat.find().sort({ createdAt: 1 }).exec();
};
const addMessage = async (message) => {
    const newMessage = new chat_model_1.Chat(message);
    return newMessage.save();
};
exports.ChatServices = {
    getMessages,
    addMessage,
};
