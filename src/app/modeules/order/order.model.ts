import { model, Schema, Types } from 'mongoose';
import { Torder } from './order.interface';



const orderSchema = new Schema<Torder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      
    },

    email: {
      type: String,
     
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Car',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  { timestamps: true, versionKey: false },
);

//create order model
export const Order = model<Torder>('Order', orderSchema);