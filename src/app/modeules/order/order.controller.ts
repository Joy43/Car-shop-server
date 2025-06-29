import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { orderService } from "./order.service";
import { IJwtPayload } from "../auth/auth.interface";
import { parseBody } from './../middlewates/bodyParse';

const createOrder = catchAsync(async (req, res) => {
    const orderData = req.body;
    const userEmail = req.user?.email;
 
    if (!userEmail) {
      res.status(401).json({
        message: 'User email not found in token',
        status: false,
      });
      return;
    }
  
    if (!orderData?.products?.length) {
      res.status(400).json({
        message: 'No products found in order',
        status: false,
      });
      return;
    }
  
    const result = await orderService.createOrder(
        userEmail,
        orderData,
        req.ip!,
       
    );
  
    // Check if the result is an error object
    if (typeof result !== 'string' && result?.error) {
      res.status(result.statusCode).json({
        message: result.message,
        status: false,
      });
      return;
    }
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order placed successfully',
      data: result,
    });
  });
// ----------varoify payment------------------
  const verifyPayment=catchAsync(async(req,res)=>{
    const order=await orderService.verifyPayment(req.query.order_id as string);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: 'Order verified successfully',
      data: order,
    });
  });
  // ---get all orders------------------

  const getAllorders=catchAsync(async(req,res)=>{
    const orders=await orderService.getAllOrders(req.query as any);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Orders fetched successfully',
      data: orders,
    });
  })
  // ------------single order---------

  const getSingleOrder = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const result = await orderService.getSingleOrder(orderId);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Single Order  is retrieved successfully',
      data: result,
    });
  });

  // ------------update order----------

  const updateOrder = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const result = await orderService.updateOrder(orderId, req.body);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order is updated successfully',
      data: result,
    });
  });

  // --------------delete order------------------
  const deleteOrder = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const result = await orderService.deleteOrder(orderId);
  
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Order is deleted successfully',
      data: result,
    });
  }
  );
  export const orderContoller={
    createOrder,
    verifyPayment,
    getAllorders,
    getSingleOrder,
    updateOrder,
    deleteOrder
  }