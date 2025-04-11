import { StatusCodes } from "http-status-codes";

import AppError from "../error/AppError";
import User from "../user/user.model";
import { Order } from "./order.model";
import Car from "../cars/cars.model";
import { orderUtils } from "./order.utils";
import QueryBuilder from "../../builder/QueryBuilder";
import { orderSearchableFields } from "./order.constant";
import { Torder } from "./order.interface";

const createOrder = async (
  userEmail: string,

  payload: { products: { product: string; quantity: number }[] },
  client_ip: string,
) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User is not available");
  }

  if (!user.address || !user.phone || !user.city) {
    return {
      error: true,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Missing required user information (address, phone, or city)",
    };
  }

  if (!payload?.products?.length) {
    return {
      error: true,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "No products found in order",
    };
  }

  const updatedCars = [];

  for (const product of payload.products) {
    const { product: productId, quantity } = product;

    if (!productId || !quantity) {
      return {
        error: true,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "Product ID or quantity is missing",
      };
    }

    const car = await Car.findById(productId);
    if (!car) {
      return {
        error: true,
        statusCode: StatusCodes.NOT_FOUND,
        message: "Car not found",
      };
    }

    if (car.quantity === undefined || car.quantity < quantity) {
      return {
        error: true,
        statusCode: StatusCodes.BAD_REQUEST,
        message:
          car.quantity === undefined
            ? "Car quantity is undefined"
            : "Insufficient stock available",
      };
    }

    const updatedCar = await Car.findOneAndUpdate(
      { _id: productId },
      [
        {
          $set: {
            quantity: { $subtract: ["$quantity", quantity] },
            inStock: {
              $cond: [
                { $gt: [{ $subtract: ["$quantity", quantity] }, 0] },
                true,
                false,
              ],
            },
          },
        },
      ],
      { new: true }
    );

    if (!updatedCar) {
      return {
        error: true,
        statusCode: StatusCodes.BAD_REQUEST,
        message: "Failed to update car stock",
      };
    }

    updatedCars.push(updatedCar);
  }

  const totalPrice = updatedCars.reduce((total, car, index) => {
    return total + car.price! * payload.products[index].quantity;
  }, 0);

  const orderDetails = {
    products: payload.products,
    totalPrice,
  };

  let order = await Order.create({
    products: orderDetails.products,
    user,
    totalPrice,
  
  });

  if (!order) {
    return {
      error: true,
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Failed to create order",
    };
  }

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: "BDT",
    customer_name: user?.name,
    customer_address: user?.address,
    customer_email: user?.email,
    customer_phone: user?.phone,
    customer_city: user?.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};


// ------------order service------------------


const verifyPayment=async(order_id:string)=>{
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
}

// ----------get all-order-------------
const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find().populate('user'), query)
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery;
  return { meta, result };
};

// --------signle order------------------

const getSingleOrder = async (id: string) => {
  const order = await Order.findById(id).populate('user');
  if (!order) {
    throw new AppError(StatusCodes.NOT_FOUND, "Order not found");
  }
  return order;
};

// --------------update order---------------
const updateOrder = async (id: string, payload: Partial<Torder>) => {
  const result = await Order.findByIdAndUpdate({ _id: id }, payload, {
    unique: true,
  });
  return result;
};
// --delete order------------------
const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  return result;
};

export const orderService={
    createOrder,
    verifyPayment,
    getSingleOrder,
    updateOrder,
    deleteOrder,
    getAllOrders
};
