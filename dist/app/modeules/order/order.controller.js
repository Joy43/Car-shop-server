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
exports.orderContoller = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const orderData = req.body;
    const userEmail = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
    if (!userEmail) {
        res.status(401).json({
            message: 'User email not found in token',
            status: false,
        });
        return;
    }
    if (!((_b = orderData === null || orderData === void 0 ? void 0 : orderData.products) === null || _b === void 0 ? void 0 : _b.length)) {
        res.status(400).json({
            message: 'No products found in order',
            status: false,
        });
        return;
    }
    const result = yield order_service_1.orderService.createOrder(userEmail, orderData, req.ip);
    // Check if the result is an error object
    if (typeof result !== 'string' && (result === null || result === void 0 ? void 0 : result.error)) {
        res.status(result.statusCode).json({
            message: result.message,
            status: false,
        });
        return;
    }
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order placed successfully',
        data: result,
    });
}));
// ----------varoify payment------------------
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_service_1.orderService.verifyPayment(req.query.order_id);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        success: true,
        message: 'Order verified successfully',
        data: order,
    });
}));
// ---get all orders------------------
const getAllorders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_service_1.orderService.getAllOrders(req.query);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Orders fetched successfully',
        data: orders,
    });
}));
// ------------single order---------
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderService.getSingleOrder(orderId);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Single Order  is retrieved successfully',
        data: result,
    });
}));
// ------------update order----------
const updateOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderService.updateOrder(orderId, req.body);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order is updated successfully',
        data: result,
    });
}));
// --------------delete order------------------
const deleteOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const result = yield order_service_1.orderService.deleteOrder(orderId);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: 'Order is deleted successfully',
        data: result,
    });
}));
exports.orderContoller = {
    createOrder,
    verifyPayment,
    getAllorders,
    getSingleOrder,
    updateOrder,
    deleteOrder
};
