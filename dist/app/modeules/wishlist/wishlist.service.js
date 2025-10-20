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
exports.WishListService = void 0;
const user_model_1 = __importDefault(require("../user/user.model"));
const AppError_1 = __importDefault(require("../error/AppError"));
const http_status_codes_1 = require("http-status-codes");
const wishlist_model_1 = __importDefault(require("./wishlist.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_1 = __importDefault(require("http-status"));
const CreateWishlist = (payload, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = payload.userId || authUser.userId;
    if (!userId || !mongoose_1.default.Types.ObjectId.isValid(String(userId))) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Valid user ID is required.");
    }
    const user = yield user_model_1.default.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User not found.");
    }
    const carId = payload.carId;
    if (!carId || !mongoose_1.default.Types.ObjectId.isValid(String(carId))) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Valid car ID is required");
    }
    const alreadyExists = yield wishlist_model_1.default.findOne({
        user: user._id,
        car: carId,
    });
    if (alreadyExists) {
        return {
            success: false,
            message: "This car is already in your wishlist",
        };
    }
    const newWishlist = yield wishlist_model_1.default.create({
        user: user._id,
        car: carId,
    });
    const populatedWishlist = yield wishlist_model_1.default.findById(newWishlist._id)
        .populate("user")
        .populate("car");
    return {
        success: true,
        message: "Car added to wishlist",
        wishlist: populatedWishlist,
    };
});
// ---------------get wishlist--------------
const GetWishlistByUser = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = (authUser === null || authUser === void 0 ? void 0 : authUser.userId) || (authUser === null || authUser === void 0 ? void 0 : authUser.user);
    console.log("Debug: Extracted userId =", userId);
    if (!userId || !mongoose_1.default.Types.ObjectId.isValid(String(userId))) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Valid user ID is required.");
    }
    const user = yield user_model_1.default.findById(String(userId));
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "User not found");
    }
    const wishlistResult = yield wishlist_model_1.default.find({ user: user._id }).populate("car");
    return wishlistResult;
});
const GetAllWishlists = () => __awaiter(void 0, void 0, void 0, function* () {
    const allWishlists = yield wishlist_model_1.default.find({})
        .populate("user")
        .populate("car");
    return allWishlists;
});
const DeleteWishlist = (wishlistId, authUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (!wishlistId || !mongoose_1.default.Types.ObjectId.isValid(wishlistId)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "Valid wishlist ID is required.");
    }
    const wishlist = yield wishlist_model_1.default.findById(wishlistId);
    if (!wishlist) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Wishlist item not found.");
    }
    // Ensure user is authorized to delete
    const userId = (authUser === null || authUser === void 0 ? void 0 : authUser.userId) || (authUser === null || authUser === void 0 ? void 0 : authUser.user);
    if (String(wishlist.user) !== String(userId)) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "You are not authorized to delete this wishlist.");
    }
    yield wishlist_model_1.default.findByIdAndDelete(wishlistId);
    return {
        success: true,
        message: "Wishlist item deleted successfully",
    };
});
exports.WishListService = {
    CreateWishlist,
    GetWishlistByUser,
    GetAllWishlists,
    DeleteWishlist
};
