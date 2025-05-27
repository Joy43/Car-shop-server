import mongoose, { Schema, Document } from "mongoose";
import { IWishlist } from "./wishlist.interface";
const wishlistSchema = new Schema<IWishlist>(
  {
user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

// Create the Wishlist model
const Wishlist = mongoose.model<IWishlist>("Wishlist", wishlistSchema);

export default Wishlist;
