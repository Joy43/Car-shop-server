
import AppError from "../error/AppError";
import User from "../user/user.model";
import { StatusCodes } from "http-status-codes";

const blockUser = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }

    user.isBlocked = true;
    await user.save();

    return user;
};

export const adminService={
    blockUser
};