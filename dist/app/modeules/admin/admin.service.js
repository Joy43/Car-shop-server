"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const http_status_codes_1 = require("http-status-codes");
const blockUser = async (userId) => {
    const user = await user_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "User not found");
    }
    user.isBlocked = true;
    await user.save();
    return user;
};
exports.adminService = {
    blockUser
};
