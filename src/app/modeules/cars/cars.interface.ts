import mongoose, { Model } from "mongoose";

export type Tcars={
    brand :string,
    model:string,
    year:number,
    price:number,
    category:'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible'|'BMW'|'Tesla Cybertruck';
    imageUrls: string[];
    description:string,
    quantity:number,
    inStock:boolean,
    author:mongoose.Schema.Types.ObjectId,
    averageRating?: number;
    ratingCount?: number;

}
export interface carsModel extends Model <Tcars>{
    isUserExists(id: string): Promise<Tcars | null>; 
}