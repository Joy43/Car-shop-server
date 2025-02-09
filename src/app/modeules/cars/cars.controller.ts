import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { carService } from "./cars.service";

const createCars = catchAsync(async (req, res) => {
    const user = req.user as JwtPayload;
    const userId = user._id;
    if (!userId) {
      res.status(401).json({ success: false, message: 'User ID missing in token' });
      return; 
    }
  
    const blogData = { ...req.body, author: userId };
    const blog = await carService.createCars(blogData);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
    return;
  });

  export const carController={
    createCars
  }