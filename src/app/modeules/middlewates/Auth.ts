import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { USER_ROLE } from '../user/user.contant';
import AppError from '../error/AppError';

import User from '../user/user.model';
import config from '../../config';

const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
         throw new AppError(StatusCodes.UNAUTHORIZED, 'Token not found!');
      }

      try {
         // Verify token
         const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
         console.log(decoded);
         if (!decoded || !decoded.userId) {
            throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token!');
         }

         // Extract user details from token
         const { role, email, userId } = decoded;

         // Find user by ID (DO NOT USE `iat`)
         const user = await User.findOne({ _id: userId, email, role });

         if (!user) {
            throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
         }

         if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new AppError(StatusCodes.FORBIDDEN, 'You are not authorized!');
         }

         req.user = user; // Attach user to request for further use
         next();
      } catch (error) {
         if (error instanceof TokenExpiredError) {
            return next(new AppError(StatusCodes.UNAUTHORIZED, 'Token has expired! Please login again.'));
         }
         return next(new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token!'));
      }
   });
};

export default auth;
