"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // Uncomment this line if you need CORS support
// Example API routes
app.use('/api', (req, res) => {
    res.send({ message: 'This is the /api endpoint' });
});
// Root API endpoint
app.get('/', (req, res) => {
    res.send({
        status: true,
        message: 'blog_post Server is running successfully 🏃🏽‍♂️➡️',
    });
});
// Middleware to handle 404 errors
app.use('*', (req, res) => {
    res.status(404).json({
        status: false,
        message: 'Resource not found',
    });
});
exports.default = app;
