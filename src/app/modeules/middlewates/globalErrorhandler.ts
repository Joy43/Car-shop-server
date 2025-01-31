/* eslint-disable @typescript-eslint/no-unused-vars */
 
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../../interface/error';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import handleCastError from '../../errors/handleCastError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import AppError from '../../errors/AppError';
import config from '../../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Setting default values
  let statusCode: number = 500;
  let message: string = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode ?? 500; 
    message = simplifiedError?.message ?? 'Validation error';
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode ?? 500;
    message = simplifiedError?.message ?? 'Validation error';
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode ?? 500;
    message = simplifiedError?.message ?? 'Invalid data';
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode ?? 500;
    message = simplifiedError?.message ?? 'Duplicate error';
    errorSources = simplifiedError?.errorSources ?? errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode ?? 500;
    message = err.message ?? 'Application error';
    errorSources = [
      {
        path: '',
        message: err?.message ?? 'Application error',
      },
    ];
  } else if (err instanceof Error) {
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
    stack: config.node_env === 'development' ? err?.stack : null,
  });

  // Explicitly return void
  return;
};

export default globalErrorHandler;