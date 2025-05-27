"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const admin_service_1 = require("./admin.service");
const blockUser = (0, catchAsync_1.default)(async (req, res) => {
    const { userId } = req.params;
    // Retrieve blocked user data
    const blockedUser = await admin_service_1.adminService.blockUser(userId);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: 200,
        data: blockedUser,
    });
});
exports.adminController = {
    blockUser,
};
