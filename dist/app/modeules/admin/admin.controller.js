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
exports.adminController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const admin_service_1 = require("./admin.service");
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    // Retrieve blocked user data
    const blockedUser = yield admin_service_1.adminService.blockUser(userId);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: 200,
        data: blockedUser,
    });
}));
exports.adminController = {
    blockUser,
};
