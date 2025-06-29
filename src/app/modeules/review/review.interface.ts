import { Schema } from "mongoose";

export interface IReview{
     review:string;
     rating:number;
     user:Schema.Types.ObjectId;
     car:Schema.Types.ObjectId;
     isFlagged?: boolean;
     flaggedReason?: string;
     createdAt?: Date;
     updatedAt?: Date;
}