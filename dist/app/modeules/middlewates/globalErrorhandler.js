"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const config_1 = __importDefault(require("../../config"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const globalErrorHandler = (err, req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    // Setting default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = (_a = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) !== null && _a !== void 0 ? _a : 500;
        message = (_b = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) !== null && _b !== void 0 ? _b : 'Validation error';
        errorSources = (_c = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources) !== null && _c !== void 0 ? _c : errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = (_d = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) !== null && _d !== void 0 ? _d : 500;
        message = (_e = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) !== null && _e !== void 0 ? _e : 'Validation error';
        errorSources = (_f = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources) !== null && _f !== void 0 ? _f : errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = (_g = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) !== null && _g !== void 0 ? _g : 500;
        message = (_h = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) !== null && _h !== void 0 ? _h : 'Invalid data';
        errorSources = (_j = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources) !== null && _j !== void 0 ? _j : errorSources;
    }
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = (_k = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode) !== null && _k !== void 0 ? _k : 500;
        message = (_l = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message) !== null && _l !== void 0 ? _l : 'Duplicate error';
        errorSources = (_m = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources) !== null && _m !== void 0 ? _m : errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = (_o = err === null || err === void 0 ? void 0 : err.statusCode) !== null && _o !== void 0 ? _o : 500;
        message = (_p = err.message) !== null && _p !== void 0 ? _p : 'Application error';
        errorSources = [
            {
                path: '',
                message: (_q = err === null || err === void 0 ? void 0 : err.message) !== null && _q !== void 0 ? _q : 'Application error',
            },
        ];
    }
    else if (err instanceof Error) {
        message = (_r = err.message) !== null && _r !== void 0 ? _r : 'Server error';
        errorSources = [
            {
                path: '',
                message: (_s = err === null || err === void 0 ? void 0 : err.message) !== null && _s !== void 0 ? _s : 'Server error',
            },
        ];
    }
    // Ultimate response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
    // Explicitly return void
    return;
};
exports.default = globalErrorHandler;
