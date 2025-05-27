"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./app/config"));
const mongoose_1 = __importDefault(require("mongoose"));
async function server() {
    try {
        await mongoose_1.default.connect(config_1.default.database_url);
        console.log('MongoDB connected');
        const httpServer = http_1.default.createServer(app_1.default);
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: [
                    'http://localhost:5173',
                    'https://car-shop-clientsite.vercel.app',
                    'https://openrouter.ai/api/v1/chat/completions',
                    'deepseek/deepseek-r1-distill-qwen-32b:free',
                ],
                credentials: true,
            },
        });
        io.on('connection', (socket) => {
            console.log('Client connected:', socket.id);
            // Example: listen for a message from client and reply
            socket.on('message', (data) => {
                console.log('Received message:', data);
                // Echo back the message
                socket.emit('messageResponse', `Server received: ${data}`);
            });
            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
        httpServer.listen(config_1.default.port, () => {
            console.log(`Server listening on http://localhost:${config_1.default.port}`);
        });
    }
    catch (error) {
        console.error('Server error:', error);
    }
}
server();
