import { Tcars } from "./cars.interface";
import Car from "./cars.model";
import { IImageFiles } from '../../interface/IImageFile';
import { IJwtPayload } from "../auth/auth.interface";
import AppError from "../error/AppError";
import { StatusCodes } from "http-status-codes";

const createCars=async(
    productData: Partial<Tcars>,
    productImages: IImageFiles,
    authUser: IJwtPayload
)=>{
  
const {images}=productImages;
if(!images || images.length ===0){
    throw new AppError(
        StatusCodes.BAD_GATEWAY,
        'cars image is required'
    );
}
productData.imageUrls = images.map((image) => image.path);

const result={ ...productData, authUser }
return result;

};


export const carService={
    createCars,
}