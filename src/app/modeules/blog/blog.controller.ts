import status from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { ServiceBlogpost } from "./blog.service";

const CreateBlogPost=catchAsync(async(req,res)=>{
    const result=await ServiceBlogpost.CreateBlogPost(req.body);

    sendResponse(res,{
        statusCode:status.CREATED,
        message:"Blog are created",
        success:true,
        data:result
    })
})

export const ControllerBlogpost={
    CreateBlogPost
}