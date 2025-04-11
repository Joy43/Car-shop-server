"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRouter = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
;
const user_contant_1 = require("../user/user.contant");
const Auth_1 = __importDefault(require("../middlewates/Auth"));
const router = express_1.default.Router();
router.patch("/:userId", (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), admin_controller_1.adminController.blockUser);
exports.AdminRouter = router;
