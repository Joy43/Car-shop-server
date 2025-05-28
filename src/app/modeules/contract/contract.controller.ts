import status from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { ContractService } from "./contract.service";

const CreateContract=catchAsync((req,res)=>{
    const result=ContractService.CreateContract(req.body)
    sendResponse(res,{
        statusCode:status.CREATED,
        success:true,
        message:"created sucessfully",
        data:result
    })
})
export const ContractController={
CreateContract
}