"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = __importDefault(require("../../config"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token not found!');
        }
        try {
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
            console.log(decoded);
            if (!decoded || !decoded.userId) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid token!');
            }
            // Extract user details from token
            const { role, email, userId } = decoded;
            // Find user by ID (DO NOT USE `iat`)
            const user = await user_model_1.default.findOne({ _id: userId, email, role });
            if (!user) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found!');
            }
            if (requiredRoles.length && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'You are not authorized!');
            }
            req.user = user; // Attach user to request for further use
            next();
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Token has expired! Please login again.'));
            }
            return next(new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid token!'));
        }
    });
};
exports.default = auth;
