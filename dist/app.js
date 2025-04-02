"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./app/routes"));
const os_1 = __importDefault(require("os"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const globalErrorhandler_1 = __importDefault(require("./app/modeules/middlewates/globalErrorhandler"));
const http_status_1 = __importDefault(require("http-status"));
const http_status_codes_1 = require("http-status-codes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173', credentials: true }));
app.use((0, cookie_parser_1.default)());
// parsers api
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// -----api end point--------
app.use('/api', routes_1.default);
//-------------global error handler-------------------
app.use(globalErrorhandler_1.default);
// -----root api endpoint------
app.get("/", (req, res, next) => {
    const currentDateTime = new Date().toISOString();
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const serverHostname = os_1.default.hostname();
    const serverPlatform = os_1.default.platform();
    const serverUptime = os_1.default.uptime();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: "car industy server is running Now",
        version: "1.0.0",
        clientDetails: {
            ipAddress: clientIp,
            accessedAt: currentDateTime,
        },
        serverDetails: {
            hostname: serverHostname,
            platform: serverPlatform,
            uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor((serverUptime / 60) % 60)} minutes`,
        },
        developerContact: {
            email: "ssjoy370@gmail.com",
            website: "https://shahsultan-islam-joy.vercel.app/",
        },
    });
});
//----------------handle not found----------------------
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
