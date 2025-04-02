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
exports.carService = void 0;
const cars_model_1 = __importDefault(require("./cars.model"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const cars_constant_1 = require("./cars.constant");
const user_model_1 = __importDefault(require("../user/user.model"));
// Define carsearchableField with appropriate fields
// --------------create car product -----------------
const createCars = (productData, productImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    //   -------image functionality--------------
    const { images } = productImages;
    if (!images || images.length === 0) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_GATEWAY, 'cars image is required');
    }
    productData.imageUrls = images.map((image) => image.path);
    const Dataparse = Object.assign(Object.assign({}, productData), { authUser });
    console.log(Dataparse);
    const result = yield cars_model_1.default.create(Dataparse);
    return result;
});
// ------get all cars-----------
const getAllCars = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const carsQuery = new QueryBuilder_1.default(cars_model_1.default.find(), query)
        .search(cars_constant_1.carSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield carsQuery.countTotal();
    const result = yield carsQuery.modelQuery;
    return { meta, result };
});
// ----------get single product--------------
const getSinglecarProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield cars_model_1.default.findById(productId);
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Car product not found");
    }
    const carObj = car.toObject();
    return Object.assign({}, carObj);
});
// --------update cars service-----------------
const updateCar = (productId, payload, productImages, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { images } = productImages;
    const user = yield user_model_1.default.findById(authUser.userId);
    const car = yield cars_model_1.default.findOne({
        _id: productId,
    });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'user is not aviable');
    }
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Car Not Found');
    }
    if (images && images.length > 0) {
        payload.imageUrls = images.map((image) => image.path);
    }
    return yield cars_model_1.default.findByIdAndUpdate(productId, payload, { new: true });
});
// ------------delete car product-----------
const deleteCar = (productId, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(authUser.userId);
    const car = yield cars_model_1.default.findOne({
        _id: productId,
    });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Admin user not aviable');
    }
    if (!car) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Car product not');
    }
    return yield cars_model_1.default.findByIdAndDelete(productId);
});
exports.carService = {
    createCars,
    getSinglecarProduct,
    getAllCars,
    updateCar,
    deleteCar
};
