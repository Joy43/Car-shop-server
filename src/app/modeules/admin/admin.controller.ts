import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { adminService } from "./admin.service";




const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params;
// Retrieve blocked user data
    const blockedUser = await adminService.blockUser(userId); 

    sendResponse(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: 200,
        data: blockedUser, 
    });
});

export const adminController = {

    blockUser,
};
