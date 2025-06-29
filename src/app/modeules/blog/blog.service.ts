import { IBlogPost } from "./blog.interface";
import { Blogpost } from "./blog.model";

// Create a new blog post
const CreateBlogPost = async (data: IBlogPost) => {
  const result = await Blogpost.create(data);
  return result;
};

// Get all blog posts
const GetAllBlogPost = async () => {
  const result = await Blogpost.find();
  return result;
};

// Get single blog post by ID
const GetSingleBlogById = async (id: string) => {
  const result = await Blogpost.findById(id);
  return result;
};
// Update blog post by ID
const UpdateBlogById = async (id: string, data: Partial<IBlogPost>) => {
  const result = await Blogpost.findByIdAndUpdate(id, data, { new: true });
  return result;
};
const DeleteBlogById = async (id: string) => {
  const result = await Blogpost.deleteOne({ blogId: id });
  return result;
};

export const ServiceBlogpost = {
  CreateBlogPost,
  GetAllBlogPost,
  GetSingleBlogById,
  DeleteBlogById,
  UpdateBlogById
};
