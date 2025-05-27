import User from "../user/user.model";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import Wishlist from "./wishlist.model";
import { IWishlist } from "./wishlist.interface";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import status from "http-status";

const CreateWishlist = async (
  payload: { userId?: string; carId: string },
  authUser: JwtPayload
) => {
  const userId = payload.userId || authUser.userId;

  if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
    throw new AppError(status.BAD_REQUEST, "Valid user ID is required.");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found.");
  }

  const carId = payload.carId;

  if (!carId || !mongoose.Types.ObjectId.isValid(String(carId))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid car ID is required");
  }

  const alreadyExists = await Wishlist.findOne({
    user: user._id,
    car: carId,
  });

  if (alreadyExists) {
    return {
      success: false,
      message: "This car is already in your wishlist",
    };
  }

  const newWishlist = await Wishlist.create({
    user: user._id,
    car: carId,
  });

  const populatedWishlist = await Wishlist.findById(newWishlist._id)
    .populate("user")
    .populate("car");

  return {
    success: true,
    message: "Car added to wishlist",
    wishlist: populatedWishlist,
  };
};


const GetWishlistByUser = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
  }

  const wishlist = await Wishlist.find({ user: user._id }).populate("car");

  return {
    success: true,
    wishlist,
  };
};

export const WishListService = {
  CreateWishlist,
  GetWishlistByUser,
};
