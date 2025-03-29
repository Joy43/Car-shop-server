import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { carService } from "./cars.service";
import { IJwtPayload } from "../auth/auth.interface";
import { IImageFiles } from "../../interface/IImageFile";
import { StatusCodes } from "http-status-codes";


const createCars = catchAsync(async (req, res) => {
    
  
    const result= await carService.createCars(
      req.body,
      req.files as IImageFiles,
      req.user as IJwtPayload
      
      );
    console.log(result);
  
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'cars created sucessfully ',
      data: result,
    });
    return;
  });


  // ---------get single product -----------

  const getSiglecarProduct=catchAsync(async(req,res)=>{
    const {productId}=req.params;
    const result=await carService.getSinglecarProduct(productId);
    sendResponse(res,{
      statusCode:StatusCodes.OK,
      success: true,
      message: " car Product retrieved successfully",
      data: result,
    })
  })
  export const carController={
    createCars,getSiglecarProduct
  }