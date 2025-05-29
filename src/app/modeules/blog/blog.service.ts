import { IBlogPost } from "./blog.interface";
import { Blogpost } from "./blog.model";

const CreateBlogPost=async(data:IBlogPost)=>{
    const result=await Blogpost.create(data);
    return result

}

const GetallBlogPost=async()=>{

}

const GetSigleBlogId=async()=>{

}
export const ServiceBlogpost={
CreateBlogPost,
GetallBlogPost,
GetSigleBlogId

}