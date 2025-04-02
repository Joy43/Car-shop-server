"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = __importDefault(require("../middlewates/validateRequest"));
const router = (0, express_1.Router)();
// -----------register -------------
router.post('/register', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), auth_controller_1.AuthController.register);
// -----------login -------------
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.loginValidationSchema), auth_controller_1.AuthController.login);
//  --------refresh token-------
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.AuthValidation.refreshTokenValidationSchema), auth_controller_1.AuthController.refreshTokens);
exports.authRoute = router;
