"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const contract_service_1 = require("./contract.service");
const CreateContract = (0, catchAsync_1.default)((req, res) => {
    const result = contract_service_1.ContractService.CreateContract(req.body);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "created sucessfully",
        data: result
    });
});
exports.ContractController = {
    CreateContract
};
