"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const Auth_1 = __importDefault(require("../middlewates/Auth"));
const user_contant_1 = require("../user/user.contant");
const validateRequest_1 = __importDefault(require("../middlewates/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const router = (0, express_1.Router)();
// ------------create order------------------
router.post('/', (0, Auth_1.default)(user_contant_1.USER_ROLE.user, user_contant_1.USER_ROLE.admin), (0, validateRequest_1.default)(order_validation_1.OrderValidations.createOrderSchema), order_controller_1.orderContoller.createOrder);
// --------------verify payment-----------------
router.get('/verify-payment', (0, Auth_1.default)(user_contant_1.USER_ROLE.user, user_contant_1.USER_ROLE.admin), order_controller_1.orderContoller.verifyPayment);
// --------------get all order------------------
router.get('/', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin, user_contant_1.USER_ROLE.user), order_controller_1.orderContoller.getAllorders);
// --------------get single order------------------
router.get('/:orderId', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin, user_contant_1.USER_ROLE.user), order_controller_1.orderContoller.getSingleOrder);
// --------------update order------------------
router.patch('/:id', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), (0, validateRequest_1.default)(order_validation_1.OrderValidations.updateOrderSchema), order_controller_1.orderContoller.updateOrder);
// --------------delete order------------------
router.delete('/:id', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), order_controller_1.orderContoller.deleteOrder);
exports.orderRouter = router;
