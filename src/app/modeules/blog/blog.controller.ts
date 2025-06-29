import status from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendRequest";
import { ServiceBlogpost } from "./blog.service";

// Create blog post
const CreateBlogPost = catchAsync(async (req, res) => {
    console.log('car',req.body)
  const result = await ServiceBlogpost.CreateBlogPost(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    message: "Blog created successfully",
    success: true,
    data: result,
  });
});

// Get all blog posts
const GetAllBlogPost = catchAsync(async (_req, res) => {
  const result = await ServiceBlogpost.GetAllBlogPost();
  sendResponse(res, {
    statusCode: status.OK,
    message: "All blogs fetched successfully",
    success: true,
    data: result,
  });
});

// Get single blog post by ID
const GetSingleBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceBlogpost.GetSingleBlogById(id);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Blog fetched successfully",
    success: true,
    data: result,
  });
});
// delete blog post by ID
const DeleteBlogsByID = catchAsync(async (req, res) => {
  const { blogId } = req.params;
  const result = await ServiceBlogpost.DeleteBlogById(blogId);
  sendResponse(res, {
    statusCode: status.OK,
    message: "Blog fetched successfully",
    success: true,
    data: result,
  });
});
// UpdateBlogById blog post by ID
const UpdateBlogById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;  

  const result = await ServiceBlogpost.UpdateBlogById(id, updateData);

  sendResponse(res, {
    statusCode: status.OK,
    message: "Blog updated successfully",
    success: true,
    data: result,
  });
});

export const ControllerBlogpost = {
  CreateBlogPost,
  GetAllBlogPost,
  GetSingleBlogById,
  DeleteBlogsByID,
  UpdateBlogById 
};
