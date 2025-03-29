import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../user/user.interface';
import catchAsync from '../utils/catchAsync';
import User from '../user/user.model';
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error('You are not authorized!');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Token missing!');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, "secret");
    } catch (error) {
      throw new Error('Invalid token!');
    }

    const { role, email,name } = decoded as JwtPayload;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('This user is not found!');
    }

    if (user.status === 'blocked') {
      throw new Error('This user is blocked!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error('You are not authorized!');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;