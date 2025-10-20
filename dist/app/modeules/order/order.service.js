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
exports.orderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../error/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = require("./order.model");
const order_utils_1 = require("./order.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const order_constant_1 = require("./order.constant");
const cars_model_1 = require("../cars/cars.model");
const createOrder = (userEmail, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.default.findOne({ email: userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User is not available");
    }
    if (!user.address || !user.phone || !user.city) {
        return {
            error: true,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "Missing required user information (address, phone, or city)",
        };
    }
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length)) {
        return {
            error: true,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "No products found in order",
        };
    }
    const updatedCars = [];
    for (const product of payload.products) {
        const { product: productId, quantity } = product;
        if (!productId || !quantity) {
            return {
                error: true,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: "Product ID or quantity is missing",
            };
        }
        const car = yield cars_model_1.Car.findById(productId);
        if (!car) {
            return {
                error: true,
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: "Car not found",
            };
        }
        if (car.quantity === undefined || car.quantity < quantity) {
            return {
                error: true,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: car.quantity === undefined
                    ? "Car quantity is undefined"
                    : "Insufficient stock available",
            };
        }
        const updatedCar = yield cars_model_1.Car.findOneAndUpdate({ _id: productId }, [
            {
                $set: {
                    quantity: { $subtract: ["$quantity", quantity] },
                    inStock: {
                        $cond: [
                            { $gt: [{ $subtract: ["$quantity", quantity] }, 0] },
                            true,
                            false,
                        ],
                    },
                },
            },
        ], { new: true });
        if (!updatedCar) {
            return {
                error: true,
                statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: "Failed to update car stock",
            };
        }
        updatedCars.push(updatedCar);
    }
    const totalPrice = updatedCars.reduce((total, car, index) => {
        return total + car.price * payload.products[index].quantity;
    }, 0);
    const orderDetails = {
        products: payload.products,
        totalPrice,
    };
    let order = yield order_model_1.Order.create({
        products: orderDetails.products,
        user,
        totalPrice,
    });
    if (!order) {
        return {
            error: true,
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "Failed to create order",
        };
    }
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user === null || user === void 0 ? void 0 : user.name,
        customer_address: user === null || user === void 0 ? void 0 : user.address,
        customer_email: user === null || user === void 0 ? void 0 : user.email,
        customer_phone: user === null || user === void 0 ? void 0 : user.phone,
        customer_city: user === null || user === void 0 ? void 0 : user.city,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
// ------------order varify service------------------
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.Order.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
// ----------get all-order-------------
const getAllOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate('user'), query)
        .search(order_constant_1.orderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield orderQuery.countTotal();
    const result = yield orderQuery.modelQuery;
    return { meta, result };
});
// --------signle order------------------
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id).populate('user');
    if (!order) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Order not found");
    }
    return order;
});
// --------------update order---------------
const updateOrder = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndUpdate({ _id: id }, payload, {
        unique: true,
    });
    return result;
});
// --delete order------------------
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findByIdAndDelete(id);
    return result;
});
exports.orderService = {
    createOrder,
    verifyPayment,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getAllOrders
};
