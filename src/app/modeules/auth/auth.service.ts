import { TUser } from "../user/user.interface";
import bcrypt from 'bcrypt';
import User from "../user/user.model";
import AppError from "../error/AppError";
import httpStatus from 'http-status';
import { TLoginUser } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";

// ---------- register-------
const register = async (payload: TUser) => {
    const result = await User.create(payload);
    return result;
};

/* 
#######-----------------------------######
        Login Function
#####--------------------------------#######
*/
const login = async (payload: TLoginUser) => {
    // Checking if user exists
    const user = await User.findOne({ email: payload?.email }).select('+password');

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    if (user?.isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
    }

    if (user?.status === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    // Checking password correctness
    const isPasswordMatched = await bcrypt.compare(payload?.password, user?.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, 'Wrong Password! Provide correct password.');
    }

    // Creating JWT payload
    const jwtPayload = {
        userId: user._id.toString(),
        role: user.role,
        name: user.name,
        email: user.email,
        image:user.image,
        user:user._id.toString()
    };

    // Creating access and refresh tokens
    const token = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);

    return {
        token,
        refreshToken,
        user
    };
};

/* 
---------------------------------------------------------------
  Refresh Token Function (Moved Outside)
----------------------------------------------------------
*/
const refreshTokens = async (token: string) => {
    try {
        // Checking if the token is valid
        const decoded = verifyToken(token, config.jwt_refresh_secret as string);
        const { userId } = decoded;

        // Checking if user exists
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
        }

        if (user.isDeleted) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
        }

        if (user.status === 'blocked') {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
        }

        // Creating a new access token
        const jwtPayload = {
          userId: user._id.toString(),
          role: user.role,
          name: user.name,
          email: user.email,
          image:user.image,
          user:user._id.toString()
        };

        const newToken = createToken(
          jwtPayload,
         config.jwt_access_secret as string, config.jwt_access_expires_in as string);

        return {
            token: newToken,
        };
    } catch (error) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid refresh token!');
    }
};

export const AuthService = {
    register,
    login,
    refreshTokens  
};
