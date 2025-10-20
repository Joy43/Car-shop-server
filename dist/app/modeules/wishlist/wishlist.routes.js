"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlistrouter = void 0;
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("../middlewates/Auth"));
const user_contant_1 = require("../user/user.contant");
const wishlist_controller_1 = require("./wishlist.controller");
const router = express_1.default.Router();
router.post("/", (0, Auth_1.default)(user_contant_1.USER_ROLE.admin, user_contant_1.USER_ROLE.user), wishlist_controller_1.WishListController.createWishlist);
// router.get("/",auth(USER_ROLE.user),WishListController.getWishlist);
router.get("/", (0, Auth_1.default)(user_contant_1.USER_ROLE.user, user_contant_1.USER_ROLE.admin), wishlist_controller_1.WishListController.getAllWishlist);
router.delete("/:id", wishlist_controller_1.WishListController.DeleteWishlist);
exports.Wishlistrouter = router;
