"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRouter = void 0;
const express_1 = require("express");
const Auth_1 = __importDefault(require("../middlewates/Auth"));
const validateRequest_1 = __importDefault(require("../middlewates/validateRequest"));
const cars_validation_1 = require("./cars.validation");
const cars_controller_1 = require("./cars.controller");
const user_contant_1 = require("../user/user.contant");
const multer_config_1 = require("../../config/multer.config");
const bodyParse_1 = require("../middlewates/bodyParse");
const router = (0, express_1.Router)();
// --------create car product-----------
router.post('/', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), multer_config_1.multerUpload.fields([{ name: 'images' }]), bodyParse_1.parseBody, (0, validateRequest_1.default)(cars_validation_1.carsValidation.createCarValidationSchema), cars_controller_1.carController.createCars);
// ----------update product car-------------
router.patch('/:productId', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), multer_config_1.multerUpload.fields([{ name: 'images' }]), bodyParse_1.parseBody, cars_controller_1.carController.updateCar);
// ------get single car product --------------
router.get('/:productId', cars_controller_1.carController.getSiglecarProduct);
// ------get all car product-------------
router.get('/', cars_controller_1.carController.getAllCars);
// --------delete car------------
router.delete('/:productId', (0, Auth_1.default)(user_contant_1.USER_ROLE.admin), cars_controller_1.carController.deleteCar);
exports.carsRouter = router;
