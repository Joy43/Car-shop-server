import mongoose, { Query } from "mongoose"
import { Review } from "./review.model";
import { IReview } from "./review.interface";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import status from "http-status";
import { Car } from "../cars/cars.model";

import QueryBuilder from "../../builder/QueryBuilder";

const createReview = async (payload: IReview, authUser: JwtPayload) => {
  console.log("Payload:", payload);
  console.log("Authenticated user:", authUser);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const userId = payload.user || authUser.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(String(userId))) {
      throw new AppError(status.BAD_REQUEST, "Valid user ID is required.");
    }

    const existingReview = await Review.findOne(
      {
        user: userId,
        car: payload.car,
      },
      null,
      { session }
    );

    if (existingReview) {
      throw new AppError(
        status.BAD_REQUEST,
        "You have already reviewed this product"
      );
    }

    const newReview = new Review({
      ...payload,
      user: userId,
    });

    await newReview.save({ session });

    const reviews = await Review.aggregate([
      { $match: { car: newReview.car } },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
          ratingCount: { $sum: 1 },
        },
      },
    ]);

    const { averageRating = 0, ratingCount = 0 } = reviews[0] || {};

    const updatedCar = await Car.findByIdAndUpdate(
      payload.car,
      { averageRating, ratingCount },
      { session, new: true }
    );

    if (!updatedCar) {
      throw new AppError(
        status.NOT_FOUND,
        "Car product not found during rating update."
      );
    }

    await session.commitTransaction();

    // Populate review with full user and car info
    const populatedReview = await Review.findById(newReview._id)
      .populate("user")
      .populate("car");

    return populatedReview;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};



// -----------get all review-------
const getAllReviews=async(query:Record <string,unknown>)=>{
    const brandQuery=new QueryBuilder(
        Review.find().populate('car user'),
        query
    )
    .search(['review'])
      .filter()
      .sort()
      .paginate()
      .fields();
      const result = await brandQuery.modelQuery;
   const meta = await brandQuery.countTotal();
   return {
    meta,
    result
   };
}
export const ReviewServices = {
   createReview,
   getAllReviews,
};