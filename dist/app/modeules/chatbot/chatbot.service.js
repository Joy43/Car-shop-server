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
exports.ChatbotService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const config_1 = __importDefault(require("../../config"));
if (!config_1.default.gemini_api_key) {
    throw new Error("Gemini API key is missing in config.");
}
const genAI = new generative_ai_1.GoogleGenerativeAI(config_1.default.gemini_api_key);
const CreateaskGemini = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = yield model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
});
const GetaskGemini = () => __awaiter(void 0, void 0, void 0, function* () {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = yield model.generateContent("Say hello from Gemini AI!");
    const response = result.response;
    const text = response.text();
    return text;
});
exports.ChatbotService = {
    CreateaskGemini,
    GetaskGemini
};
