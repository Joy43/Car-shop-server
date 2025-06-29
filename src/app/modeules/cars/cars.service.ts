import { Tcars } from "./cars.interface";


import { IJwtPayload } from "../auth/auth.interface";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

import QueryBuilder from "../../builder/QueryBuilder";
import { carSearchableFields } from "./cars.constant";
import User from "../user/user.model";
import { Car } from "./cars.model";

// Define carsearchableField with appropriate fields


const createCars = async (
    data: Partial<Tcars>,
    authUser: IJwtPayload
  ) => {
    
    if (!data.imageUrls || data.imageUrls.length === 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Car image is required');
    }
  
    const result = await Car.create({ 
      ...data,
      authUser 
    });
    
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

// --------update cars service-----------------

const updateCar=async(
    productId: string,
    payload: Partial<Tcars>,


)=>{
 
  
    const car = await Car.findOne({
      
        _id: productId,
     });
    //  if(!user){
    //     throw new AppError(StatusCodes.BAD_REQUEST,'user is not aviable')
    //  }
     if (!car) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Car Not Found');
     }
   
     return await Car.findByIdAndUpdate(productId, payload, { new: true });
};

// ------------delete car product-----------

const deleteCar=async(productId:string,authUser:IJwtPayload)=>{
    const user=await User.findById(authUser.userId);
    const car=await Car.findOne({
        _id:productId,
    });

    if(!user){
        throw new AppError(StatusCodes.BAD_REQUEST,'Admin user not aviable')
    }
    if(!car){
        throw new AppError(StatusCodes.BAD_REQUEST,'Car product not')
    }
    return await Car.findByIdAndDelete(productId);
};
export const carService={
    createCars,
    getSinglecarProduct,
    getAllCars,
    updateCar,
    deleteCar
};