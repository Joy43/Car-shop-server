import { Types } from "mongoose";

export type Torder={
    email?:string;
    orderId?:string;
    user:Types.ObjectId;
    // -------user details--------
    status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered' | 'Cancelled';
    // -------product deatils--------
   products:{
    product:Types.ObjectId;
    quantity:number;
   }[];
   totalPrice?:number;
// ----------transaction details----------
   transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
  details: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;

};