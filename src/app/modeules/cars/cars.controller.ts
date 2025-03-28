import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { carService } from "./cars.service";
import { IJwtPayload } from "../auth/auth.interface";
import { IImageFiles } from "../../interface/IImageFile";


const createCars = catchAsync(async (req, res) => {
    
  
    const result= await carService.createCars(
      req.body,
      req.files as IImageFiles,
      req.user as IJwtPayload
      
      );
    
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'cars created sucessfully ',
      data: result,
    });
    return;
  });

  export const carController={
    createCars
  }