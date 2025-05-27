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
        statusCode = simplifiedError?.statusCode ?? 500;
        message = simplifiedError?.message ?? 'Validation error';
        errorSources = simplifiedError?.errorSources ?? errorSources;
    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedError?.statusCode ?? 500;
        message = simplifiedError?.message ?? 'Validation error';
        errorSources = simplifiedError?.errorSources ?? errorSources;
    }
    else if (err?.name === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError?.statusCode ?? 500;
        message = simplifiedError?.message ?? 'Invalid data';
        errorSources = simplifiedError?.errorSources ?? errorSources;
    }
    else if (err?.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError?.statusCode ?? 500;
        message = simplifiedError?.message ?? 'Duplicate error';
        errorSources = simplifiedError?.errorSources ?? errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err?.statusCode ?? 500;
        message = err.message ?? 'Application error';
        errorSources = [
            {
                path: '',
                message: err?.message ?? 'Application error',
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message ?? 'Server error';
        errorSources = [
            {
                path: '',
                message: err?.message ?? 'Server error',
            },
        ];
    }
    // Ultimate response
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err,
        stack: config_1.default.NODE_ENV === 'development' ? err?.stack : null,
    });
    // Explicitly return void
    return;
};
exports.default = globalErrorHandler;
