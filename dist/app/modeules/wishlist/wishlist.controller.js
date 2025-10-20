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
exports.WishListController = void 0;
const wishlist_service_1 = require("./wishlist.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const http_status_1 = __importDefault(require("http-status"));
const createWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.user;
    const result = yield wishlist_service_1.WishListService.CreateWishlist(req.body, authUser);
    res.status(200).json(result);
}));
// -------------get wishlist
const getWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = req.user;
    const result = yield wishlist_service_1.WishListService.GetWishlistByUser(authUser);
    (0, sendRequest_1.default)(res, {
        success: true,
        message: "getwishlist is sucessfully user wise",
        statusCode: http_status_1.default.OK,
        data: result
    });
}));
const getAllWishlist = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield wishlist_service_1.WishListService.GetAllWishlists();
    (0, sendRequest_1.default)(res, {
        success: true,
        message: "All wishlists retrieved successfully",
        statusCode: http_status_1.default.OK,
        data: result,
    });
}));
// ---------delete-----------
const DeleteWishlist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield wishlist_service_1.WishListService.DeleteWishlist(id, req.user);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
exports.WishListController = {
    createWishlist,
    getWishlist,
    getAllWishlist,
    DeleteWishlist
};
