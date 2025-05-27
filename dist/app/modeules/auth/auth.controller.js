"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
// ---------- register---------------
const register = async (req, res) => {
    const result = await auth_service_1.AuthService.register(req.body);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: 'user is register sucessfully',
        statusCode: 201,
        data: result
    });
};
// ---------------- login ------
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.login(req.body);
    const { token, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.default.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'none',
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    (0, sendRequest_1.default)(res, {
        success: true,
        message: 'login sucessfully',
        statusCode: http_status_1.default.OK,
        data: {
            token,
            refreshToken
        },
    });
});
// ----------refresh token --------------
const refreshTokens = (0, catchAsync_1.default)(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_service_1.AuthService.refreshTokens(refreshToken);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Access token is retrieved successfully!',
        data: result,
    });
});
exports.AuthController = {
    register,
    login,
    refreshTokens
};
