import { model, Schema } from "mongoose";
import { IBlogPost } from "./blog.interface";


const BlogpostSchema = new Schema<IBlogPost>(
   {
      id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  featuredImage: { type: String },
  tags: [{ type: String }]
   },
   {
      timestamps: true,
   }
);

export const Blogpost = model<IBlogPost>('Blogpost', BlogpostSchema);