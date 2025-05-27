"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const review_service_1 = require("./review.service");
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const review = req.body;
    const result = await review_service_1.ReviewServices.createReview(review, user);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review created successfully',
        data: result,
    });
});
// -----------get all review------
const getAllReviews = (0, catchAsync_1.default)(async (req, res) => {
    const result = await review_service_1.ReviewServices.getAllReviews(req.query);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Review fetched successfully',
        data: result,
    });
});
exports.ReviewControllers = {
    createReview,
    getAllReviews,
};
