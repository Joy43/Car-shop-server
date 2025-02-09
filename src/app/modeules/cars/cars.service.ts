import { Tcars } from "./cars.interface";
import Car from "./cars.model";


type AutherType={
    _id:string;
    name:string;
    email:string;
    status?:string
}
const createCars=async(payload:Tcars)=>{
    const car=await Car.create(payload)
    return Car.findById(car._id).populate('author')
};
export const carService={
    createCars
}