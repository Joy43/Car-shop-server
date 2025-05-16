import status from "http-status";
import catchAsync from "../utils/catchAsync";
import { ReviewServices } from "./review.service";
import sendResponse from "../utils/sendRequest";
import { JwtPayload } from "jsonwebtoken";


const createReview=catchAsync(async(req,res)=>{
    const user=req.user as JwtPayload;
    const review=req.body;
    const result=await ReviewServices.createReview(review,user)
      sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Review created successfully',
      data: result,
   });
});
// -----------get all review------
const getAllReviews = catchAsync(async (req, res) => {
   const result = await ReviewServices.getAllReviews(req.query);

   sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Review fetched successfully',
      data: result,
   });
});
export const ReviewControllers = {
   createReview,
   getAllReviews,
};