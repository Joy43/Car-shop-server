"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBody = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
exports.parseBody = (0, catchAsync_1.default)(async (req, res, next) => {
    if (!req.body.data) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Please provide data in the body under data key');
    }
    req.body = req.body.data;
    next();
});
