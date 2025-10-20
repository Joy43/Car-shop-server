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
exports.SubscribeService = void 0;
const emailSendContract_1 = __importDefault(require("../contract/emailSendContract"));
const subscribe_model_1 = __importDefault(require("./subscribe.model"));
const CreateSubscribe = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Save contract data to the database
    const newContract = yield subscribe_model_1.default.create(data);
    // email HTML content
    const emailHTML = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
    <h2 style="color: #4A90E2;">Thank you for subscribe Car Shop!</h2>
    <p>Hi <strong>${data.email}</strong>,</p>
    <p>We’ve received your inquiry and truly appreciate your interest in our services. One of our car experts will get in touch with you shortly to assist you further.</p>
    
    <hr style="margin: 20px 0;" />
    
    <h3 style="color: #333;">Your Contact Details:</h3>
  

    <hr style="margin: 20px 0;" />

    <p>If your inquiry is urgent, feel free to call us directly at <strong style="color:#4A90E2;">01726-606816</strong>.</p>
    <p>We look forward to helping you find your ideal vehicle!</p>

    <p style="margin-top: 30px;">Best regards, <br />
    <strong>Car Shop Team</strong><br />
    <a href="https://yourcarshopwebsite.com" style="color: #4A90E2; text-decoration: none;">www.yourcarshopwebsite.com</a>
    </p>
  </div>
`;
    // Send confirmation email to 
    yield (0, emailSendContract_1.default)(data.email, emailHTML);
    return newContract;
});
exports.SubscribeService = {
    CreateSubscribe,
};
