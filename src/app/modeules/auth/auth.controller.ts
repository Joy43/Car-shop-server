import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../utils/sendRequest";
import status from "http-status";
import config from "../../config";


// ---------- register---------------
const register=async(req:Request,res:Response)=>{
 const result =await AuthService.register(req.body);

 sendResponse(res,{
    success:true,
    message:'user is register sucessfully',
    statusCode:201,
    data:result
 })

}

// ---------------- login ------

const login=catchAsync(async(req:Request,res:Response)=>{
    const result=await AuthService.login(req.body);
    const {  token,refreshToken } = result;

    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    

    sendResponse(res,{
       
        success:true,
        message:'login sucessfully',
        statusCode:status.OK,
    
        data: {
            token,
            refreshToken
            
            
        },
    })
});
// ----------refresh token --------------
const refreshTokens=catchAsync(async(req, res)=>{
    const { refreshToken } = req.cookies;
  const result = await AuthService.refreshTokens(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
})

export const AuthController={
    register,
    login,
    refreshTokens

}
