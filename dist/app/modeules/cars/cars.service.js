"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carService = void 0;
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const cars_constant_1 = require("./cars.constant");
const user_model_1 = __importDefault(require("../user/user.model"));
const cars_model_1 = require("./cars.model");
// Define carsearchableField with appropriate fields
const createCars = async (data, authUser) => {
    if (!data.imageUrls || data.imageUrls.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Car image is required');
    }
    const result = await cars_model_1.Car.create({
        ...data,
        authUser
    });
    return result;
};
// ------get all cars-----------
const getAllCars = async (query) => {
    const carsQuery = new QueryBuilder_1.default(cars_model_1.Car.find(), query)
        .search(cars_constant_1.carSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = await carsQuery.countTotal();
    const result = await carsQuery.modelQuery;
    return { meta, result };
};
// ----------get single product--------------
const getSinglecarProduct = async (productId) => {
    const car = await cars_model_1.Car.findById(productId);
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Car product not found");
    }
    const carObj = car.toObject();
    return {
        ...carObj
    };
};
// --------update cars service-----------------
const updateCar = async (productId, payload) => {
    const car = await cars_model_1.Car.findOne({
        _id: productId,
    });
    //  if(!user){
    //     throw new AppError(StatusCodes.BAD_REQUEST,'user is not aviable')
    //  }
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Car Not Found');
    }
    return await cars_model_1.Car.findByIdAndUpdate(productId, payload, { new: true });
};
// ------------delete car product-----------
const deleteCar = async (productId, authUser) => {
    const user = await user_model_1.default.findById(authUser.userId);
    const car = await cars_model_1.Car.findOne({
        _id: productId,
    });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Admin user not aviable');
    }
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Car product not');
    }
    return await cars_model_1.Car.findByIdAndDelete(productId);
};
exports.carService = {
    createCars,
    getSinglecarProduct,
    getAllCars,
    updateCar,
    deleteCar
};
