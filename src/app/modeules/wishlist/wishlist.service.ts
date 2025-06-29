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

// ---------------get wishlist--------------
const GetWishlistByUser = async (authUser: JwtPayload) => {
  const userId = authUser?.userId || authUser?.user;

  console.log("Debug: Extracted userId =", userId);

  if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid user ID is required.");
  }

  const user = await User.findById(String(userId));
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found");
  }

  const wishlistResult = await Wishlist.find({ user: user._id }).populate("car");

  return wishlistResult;
};

const GetAllWishlists = async () => {
  const allWishlists = await Wishlist.find({})
    .populate("user")
    .populate("car");

  return allWishlists;
};

const DeleteWishlist = async (wishlistId: string, authUser: JwtPayload) => {
  if (!wishlistId || !mongoose.Types.ObjectId.isValid(wishlistId)) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Valid wishlist ID is required.");
  }

  const wishlist = await Wishlist.findById(wishlistId);

  if (!wishlist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wishlist item not found.");
  }

  // Ensure user is authorized to delete
  const userId = authUser?.userId || authUser?.user;
  if (String(wishlist.user) !== String(userId)) {
    throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized to delete this wishlist.");
  }

  await Wishlist.findByIdAndDelete(wishlistId);

  return {
    success: true,
    message: "Wishlist item deleted successfully",
  };
};


export const WishListService = {
  CreateWishlist,
  GetWishlistByUser,
  GetAllWishlists,
  DeleteWishlist
};
