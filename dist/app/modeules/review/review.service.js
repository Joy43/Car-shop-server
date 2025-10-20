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
exports.ReviewServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const review_model_1 = require("./review.model");
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const cars_model_1 = require("../cars/cars.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createReview = (payload, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Payload:", payload);
    console.log("Authenticated user:", authUser);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const userId = payload.user || authUser.userId;
        if (!userId || !mongoose_1.default.Types.ObjectId.isValid(String(userId))) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Valid user ID is required.");
        }
        const existingReview = yield review_model_1.Review.findOne({
            user: userId,
            car: payload.car,
        }, null, { session });
        if (existingReview) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You have already reviewed this product");
        }
        const newReview = new review_model_1.Review(Object.assign(Object.assign({}, payload), { user: userId }));
        yield newReview.save({ session });
        const reviews = yield review_model_1.Review.aggregate([
            { $match: { car: newReview.car } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    ratingCount: { $sum: 1 },
                },
            },
        ]);
        const { averageRating = 0, ratingCount = 0 } = reviews[0] || {};
        const updatedCar = yield cars_model_1.Car.findByIdAndUpdate(payload.car, { averageRating, ratingCount }, { session, new: true });
        if (!updatedCar) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Car product not found during rating update.");
        }
        yield session.commitTransaction();
        // Populate review with full user and car info
        const populatedReview = yield review_model_1.Review.findById(newReview._id)
            .populate("user")
            .populate("car");
        return populatedReview;
    }
    catch (err) {
        yield session.abortTransaction();
        throw err;
    }
    finally {
        session.endSession();
    }
});
// -----------get all review-------
const getAllReviews = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const brandQuery = new QueryBuilder_1.default(review_model_1.Review.find().populate('car user'), query)
        .search(['review'])
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield brandQuery.modelQuery;
    const meta = yield brandQuery.countTotal();
    return {
        meta,
        result
    };
});
exports.ReviewServices = {
    createReview,
    getAllReviews,
};
