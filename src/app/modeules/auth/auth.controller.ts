import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../utils/sendRequest";
import status from "http-status";

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

    sendResponse(res,{
       
        success:true,
        message:'login sucessfully',
        statusCode:status.OK,
    
        data: {
            token: result.token,
            
        },
    })
});


export const AuthController={
    register,login
}
