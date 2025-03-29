import { Tcars } from "./cars.interface";
import Car from "./cars.model";
import { IImageFiles } from '../../interface/IImageFile';
import { IJwtPayload } from "../auth/auth.interface";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";
import status from "http-status";
import { carController } from "./cars.controller";
import { query } from "express";
import QueryBuilder from "../../builder/QueryBuilder";
import { carSearchableFields } from "./cars.constant";

// Define carsearchableField with appropriate fields


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

// ------get all cars-----------

const getAllCars=async(query:Record<string,unknown>)=>{
  const carsQuery=new QueryBuilder(Car.find(),query)
  
  .search(carSearchableFields)
  .filter()
  .sort()
  .paginate()
  .fields();
  
  const meta=await carsQuery.countTotal();
  const result=await carsQuery.modelQuery;
  return{meta,result}
};

// ----------get single product--------------
const getSinglecarProduct = async (productId: string) => {
    const car = await Car.findById(productId);
    if (!car) {
        throw new AppError(StatusCodes.NOT_FOUND, "Car product not found");
    }
    const carObj = car.toObject(); 
    return {
        ...carObj
    };
};

export const carService={
    createCars,
    getSinglecarProduct,
    getAllCars
}