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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log("MongoDB connected");
            const httpServer = http_1.default.createServer(app_1.default);
            const io = new socket_io_1.Server(httpServer, {
                cors: {
                    origin: [
                        "http://localhost:5173",
                        "https://car-shop-clientsite.vercel.app",
                        "https://openrouter.ai/api/v1/chat/completions",
                        "deepseek/deepseek-r1-distill-qwen-32b:free",
                    ],
                    credentials: true,
                },
            });
            httpServer.listen(config_1.default.PORT, () => {
                console.log(`Server listening on http://localhost:${config_1.default.PORT}`);
            });
        }
        catch (error) {
            console.error("Server error:", error);
        }
    });
}
server();
