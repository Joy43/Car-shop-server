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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
// ---------- register-------
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(payload);
    return result;
});
/*
#######-----------------------------######
        Login Function
#####--------------------------------#######
*/
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Checking if user exists
    const user = yield user_model_1.default.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
    }
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is deleted!');
    }
    if ((user === null || user === void 0 ? void 0 : user.status) === 'blocked') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'This user is blocked!');
    }
    // Checking password correctness
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Wrong Password! Provide correct password.');
    }
    // Creating JWT payload
    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role,
        name: user.name,
        email: user.email,
        image: user.image,
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
});
/*
---------------------------------------------------------------
  Refresh Token Function (Moved Outside)
----------------------------------------------------------
*/
const refreshTokens = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Checking if the token is valid
        const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_refresh_secret);
        const { userId } = decoded;
        // Checking if user exists
        const user = yield user_model_1.default.findById(userId);
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
            image: user.image,
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
});
exports.AuthService = {
    register,
    login,
    refreshTokens
};
