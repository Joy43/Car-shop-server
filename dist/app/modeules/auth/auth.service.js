"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
// ---------- register-------
const register = async (payload) => {
    const result = await user_model_1.default.create(payload);
    return result;
};
/*
#######-----------------------------######
        Login Function
#####--------------------------------#######
*/
const login = async (payload) => {
    // Checking if user exists
    const user = await user_model_1.default.findOne({ email: payload?.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    if (user?.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted!');
    }
    if (user?.status === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked!');
    }
    // Checking password correctness
    const isPasswordMatched = await bcrypt_1.default.compare(payload?.password, user?.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Wrong Password! Provide correct password.');
    }
    // Creating JWT payload
    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role,
        name: user.name,
        email: user.email,
        user: user._id.toString()
    };
    // Creating access and refresh tokens
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        token,
        refreshToken,
        user
    };
};
/*
---------------------------------------------------------------
  Refresh Token Function (Moved Outside)
----------------------------------------------------------
*/
const refreshTokens = async (token) => {
    try {
        // Checking if the token is valid
        const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
        const { userId } = decoded;
        // Checking if user exists
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
        }
        if (user.isDeleted) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted!');
        }
        if (user.status === 'blocked') {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked!');
        }
        // Creating a new access token
        const jwtPayload = {
            userId: user._id.toString(),
            role: user.role,
            name: user.name,
            email: user.email,
            user: user._id.toString()
        };
        const newToken = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        return {
            token: newToken,
        };
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid refresh token!');
    }
};
exports.AuthService = {
    register,
    login,
    refreshTokens
};
