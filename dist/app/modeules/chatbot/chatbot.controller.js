"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotController = void 0;
const chatbot_service_1 = require("./chatbot.service");
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const http_status_1 = __importDefault(require("http-status"));
const askGemini = async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
    }
    const result = await chatbot_service_1.ChatbotService.askGemini(prompt);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review created successfully',
        data: result,
    });
};
exports.ChatbotController = {
    askGemini,
};
