"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../middlewates/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const Auth_1 = __importDefault(require("../middlewates/Auth"));
const user_contant_1 = require("./user.contant");
const admin_validation_1 = require("../admin/admin.validation");
const router = express_1.default.Router();
// ------CREATE USER--------
router.post('/user-create', (0, validateRequest_1.default)(user_validation_1.UserValidation.userValidationSchema), user_controller_1.userController.createUser);
// ------CREATE ADMIN--------
router.post('/create-admin', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), (0, validateRequest_1.default)(admin_validation_1.AdminValidations.createAdminValidationSchema), user_controller_1.userController.createAdmin);
// ------GET USER--------
router.get('/', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), user_controller_1.userController.getUser);
// ------GET SINGLE USER--------
router.get('/:userId', user_controller_1.userController.getSingleUser);
router.put('/:userId', user_controller_1.userController.updateUser);
// ------UPDATE USER--------
router.patch('/:userId', user_controller_1.userController.updateUser);
// ------DELETE USER--------
router.delete('/:userId', user_controller_1.userController.deleteUser);
exports.userRouter = router;
