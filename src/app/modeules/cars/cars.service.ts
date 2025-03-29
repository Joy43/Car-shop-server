import { Tcars } from "./cars.interface";
import Car from "./cars.model";
import { IImageFiles } from '../../interface/IImageFile';
import { IJwtPayload } from "../auth/auth.interface";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import status from "http-status";
import { carController } from "./cars.controller";

// --------------create car product -----------------
const createCars=async(
    productData: Partial<Tcars>,
    productImages: IImageFiles,
    authUser: IJwtPayload
)=>{
//   -------image functionality--------------
const {images}=productImages;
if(!images || images.length ===0){
    throw new AppError(
        StatusCodes.BAD_GATEWAY,
        'cars image is required'
    );
}
productData.imageUrls = images.map((image) => image.path);
const Dataparse={ ...productData, authUser }
console.log(Dataparse);
const result=await Car.create(
    Dataparse
)
return result;

};

// ----------get single product--------------
const getSinglecarProduct=async(productId:string)=>{
    const car=await Car.findById(productId);
   if(!car){
    throw new AppError(status.NOT_FOUND,'car product not found')
   } 
const carobj=car.toObject
   return{
    ...carobj
   } 
}

export const carService={
    createCars,getSinglecarProduct
}