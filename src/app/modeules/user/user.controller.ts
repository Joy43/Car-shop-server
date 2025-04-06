

import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { userService } from "./user.service";
import httpStatus from 'http-status';



const createUser = catchAsync(

    async (req, res) => {
      const payload = req.body
  
      const result = await userService.createUser(payload)
  
     
  
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user is created succesfully',
        data: result,
      });
    });


    const createAdmin = catchAsync(async (req, res) => {
      const { name, email, password } = req.body;
    
      const result = await userService.createAdminIntoDB({
        name,
        email,
        password,
        role: 'admin',
      });
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created succesfully',
        data: result,
      });
    });
  // -----------get user----------------
  const getUser = catchAsync(async (req, res) => {
    const result = await userService.getUser()
  
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
      message: 'Users getting successfully',
      data: result,
    })
  })
  
  const getSingleUser = catchAsync(async (req, res) => {
    console.log(req.params)
    const userId = req.params.userId
  
    const result = await userService.getSingleUser(userId)
  
    sendResponse(res, {
      statusCode: 
      httpStatus.OK,
      success:true,
      message: 'User getting successfully',
      data: result,
    })
  })
  // -----------update user----------------
  const updateUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
    const result = await userService.updateUser(userId,req.body)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success:true,
      message: 'User updated successfully',
      data: result,
    })
  });
  // --------delete user------------
  const deleteUser = catchAsync(async (req, res) => {
    const userId = req.params.userId
    await userService.deleteUser(userId)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success:true,
      message: 'user deleted successfully',
      data: {},
    })
  })
  
  export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    createAdmin 
  }
