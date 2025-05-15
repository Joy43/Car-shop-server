import mongoose, { Query } from "mongoose"
import { Review } from "./review.model";
import { IReview } from "./review.interface";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../error/AppError";
import status from "http-status";
import { Car } from "../cars/cars.model";

import QueryBuilder from "../../builder/QueryBuilder";

const createReview=async(payload: IReview, user: JwtPayload)=>{
const session=await mongoose.startSession();
try{
    session.startTransaction();
    const existingReview=await Review.findOne(
        {
            user:user.userId,
            car:payload.car
        },
        null,
        {session}

    );
    // ---------check exit review----------
    if(existingReview){
        throw new AppError(
            status.BAD_REQUEST,
            'you have already reviewed this product'
        )
    };
    // ---------create review---------
    const review=await Review.create([{...payload,user:user.userId}],{
        session
    });
    // --------aggregate reviews for the product-------
    const reviews=await Review.aggregate([
        {
            $match:{
                car:review[0].car
            },
        },
        {
            $group:{
                _id:null,
                averageRating:{$avg:'$rating'},
                ratingCount: { $sum: 1 },
            }
        }
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
            ' car Product not found during rating update.'
         );
      }

      await session.commitTransaction();
      return review;
}catch (err){
 await session.abortTransaction();
      throw err;
}
finally {
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