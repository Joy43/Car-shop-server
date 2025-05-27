import { Request, Response } from "express";
import { WishListService } from "./wishlist.service";
import catchAsync from "../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

const createWishlist = catchAsync(async (req: Request, res: Response) => {
  const authUser = req.user as JwtPayload; 
  const result = await WishListService.CreateWishlist(req.body, authUser);
  res.status(200).json(result);
});


 const getWishlist = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as { email: string }; 
  const result = await WishListService.GetWishlistByUser(email);
  res.status(200).json(result);
});
export const WishListController={
createWishlist,
getWishlist
}