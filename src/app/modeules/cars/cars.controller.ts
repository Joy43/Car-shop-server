import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { carService } from "./cars.service";
import { IJwtPayload } from "../auth/auth.interface";
import { IImageFiles } from "../../interface/IImageFile";
import { StatusCodes } from "http-status-codes";
import status from "http-status";


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

  // -----------------get all car product-------------
  const getAllCars=catchAsync(async(req,res)=>{
    const result=await carService.getAllCars(req.query);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: 'Bicycles retrieved successfully',
      data: result.result,
    })
  })

  // ---------get single product -----------

  const getSiglecarProduct = catchAsync(async (req, res) => {
    const { productId } = req.params;
    // console.log(" car with ID:", productId);

    const result = await carService.getSinglecarProduct(productId);
    console.log("Result from service:", result);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Car product retrieved successfully",
        data: result,
    });
});
  export const carController={
    createCars,
    getSiglecarProduct,
    getAllCars
  }