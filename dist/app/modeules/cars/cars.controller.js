"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const cars_service_1 = require("./cars.service");
const http_status_codes_1 = require("http-status-codes");
const http_status_1 = __importDefault(require("http-status"));
const createCars = (0, catchAsync_1.default)(async (req, res) => {
    const result = await cars_service_1.carService.createCars(req.body, req.user);
    (0, sendRequest_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Car created successfully',
        data: result,
    });
});
// -----------------get all car product-------------
const getAllCars = (0, catchAsync_1.default)(async (req, res) => {
    const result = await cars_service_1.carService.getAllCars(req.query);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Cars retrieved successfully',
        data: result.result,
    });
});
// ---------get single product -----------
const getSiglecarProduct = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    // console.log(" car with ID:", productId);
    const result = await cars_service_1.carService.getSinglecarProduct(productId);
    console.log("Result from service:", result);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: "Car product retrieved successfully",
        data: result,
    });
});
// ------------update car-----------
const updateCar = (0, catchAsync_1.default)(async (req, res) => {
    const { body: payload, params: { productId }, } = req;
    const result = await cars_service_1.carService.updateCar(productId, payload);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: " Car Product updated successfully",
        data: result,
    });
});
// ---------------deleteCar---------------
const deleteCar = (0, catchAsync_1.default)(async (req, res) => {
    const { user, params: { productId }, } = req;
    const result = await cars_service_1.carService.deleteCar(productId, user);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_codes_1.StatusCodes.OK,
        success: true,
        message: " car Product deleted successfully",
        data: result,
    });
});
exports.carController = {
    createCars,
    getSiglecarProduct,
    getAllCars,
    updateCar,
    deleteCar
};
