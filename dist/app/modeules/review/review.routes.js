"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const user_contant_1 = require("../user/user.contant");
const Auth_1 = __importDefault(require("../middlewates/Auth"));
const validateRequest_1 = __importDefault(require("../middlewates/validateRequest"));
const review_validation_1 = require("./review.validation");
const router = (0, express_1.Router)();
router.get('/', review_controller_1.ReviewControllers.getAllReviews);
router.post('/', (0, Auth_1.default)(user_contant_1.USER_ROLE.user, user_contant_1.USER_ROLE.admin), (0, validateRequest_1.default)(review_validation_1.ReviewValidation.createReviewValidationSchema), review_controller_1.ReviewControllers.createReview);
exports.ReviewRoutes = router;
