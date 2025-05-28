import status from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { SubscribeService } from "./subscribe.service";


const CreateSubscribe=catchAsync((req,res)=>{
    const result=SubscribeService.CreateSubscribe(req.body)
    sendResponse(res,{
        statusCode:status.CREATED,
        success:true,
        message:"subcribe sucessfully",
        data:result
    })
})
export const SubscribeController={
CreateSubscribe
}