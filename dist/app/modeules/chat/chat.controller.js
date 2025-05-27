"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const chat_service_1 = require("./chat.service");
const http_status_1 = __importDefault(require("http-status"));
// --------------- Add Message---------------------
const addMessage = (0, catchAsync_1.default)(async (req, res) => {
    const { sender, content } = req.body;
    if (!sender || !content) {
        return (0, sendRequest_1.default)(res, {
            statusCode: http_status_1.default.BAD_REQUEST,
            success: false,
            message: 'Sender and content are required',
            data: null,
        });
    }
    const result = await chat_service_1.ChatServices.addMessage({ sender, content });
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Message sent successfully',
        data: result,
    });
});
//---------------------- Get All Messages--------------------
const getMessages = (0, catchAsync_1.default)(async (req, res) => {
    const result = await chat_service_1.ChatServices.getMessages();
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Messages retrieved successfully',
        data: result,
    });
});
exports.ChatController = {
    addMessage,
    getMessages,
};
