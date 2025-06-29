import { Types } from "mongoose";

export interface IWishlist {
  user: Types.ObjectId;
  car: Types.ObjectId;
 
}
