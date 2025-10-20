"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotController = void 0;
const chatbot_service_1 = require("./chatbot.service");
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const http_status_1 = __importDefault(require("http-status"));
const askGemini = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { prompt } = req.body;
    if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
    }
    const result = yield chatbot_service_1.ChatbotService.CreateaskGemini(prompt);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'promt create sucessfully successfully',
        data: result,
    });
});
// -------------get gemenini-----------
const GetaskGemini = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield chatbot_service_1.ChatbotService.GetaskGemini();
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'retrive sucessfully sucessfully successfully',
        data: result,
    });
});
// const createImageFromPrompt = async (req: Request, res: Response) => {
//   const { prompt } = req.body;
//   if (!prompt) {
//     res.status(400).json({ error: "Prompt is required" });
//     return;
//   }
//   try {
//     const imagePath = await ChatbotService.CreateImageFromPrompt(prompt);
//     sendResponse(res, {
//       statusCode: status.OK,
//       success: true,
//       message: "Image created successfully",
//       data: imagePath,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to generate image", details: error });
//   }
// };
exports.ChatbotController = {
    askGemini,
    GetaskGemini,
};
