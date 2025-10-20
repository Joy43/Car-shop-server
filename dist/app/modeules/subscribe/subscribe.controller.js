"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const subscribe_service_1 = require("./subscribe.service");
const CreateSubscribe = (0, catchAsync_1.default)((req, res) => {
    const result = subscribe_service_1.SubscribeService.CreateSubscribe(req.body);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "subcribe sucessfully",
        data: result
    });
});
exports.SubscribeController = {
    CreateSubscribe
};
