"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const payload = req.body;
    const result = await user_service_1.userService.createUser(payload);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user is created succesfully',
        data: result,
    });
});
const createAdmin = (0, catchAsync_1.default)(async (req, res) => {
    const { name, email, password } = req.body;
    const result = await user_service_1.userService.createAdminIntoDB({
        name,
        email,
        password,
        role: 'admin',
    });
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
    });
});
// -----------get user----------------
const getUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.userService.getUser();
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users getting successfully',
        data: result,
    });
});
const getSingleUser = (0, catchAsync_1.default)(async (req, res) => {
    console.log(req.params);
    const userId = req.params.userId;
    const result = await user_service_1.userService.getSingleUser(userId);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User getting successfully',
        data: result,
    });
});
// -----------update user----------------
const updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    const result = await user_service_1.userService.updateUser(userId, req.body);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
});
// --------delete user------------
const deleteUser = (0, catchAsync_1.default)(async (req, res) => {
    const userId = req.params.userId;
    await user_service_1.userService.deleteUser(userId);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user deleted successfully',
        data: {},
    });
});
exports.userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createAdmin
};
