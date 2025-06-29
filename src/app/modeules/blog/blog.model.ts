import { model, Schema } from "mongoose";
import { IBlogPost } from "./blog.interface";

const BlogpostSchema = new Schema<IBlogPost>(
  {
    title: String,
    content: String,
    excerpt: String,
    featuredImage: String,
    tags: [String]

  },
  {
    timestamps: true,
  }
);

export const Blogpost = model<IBlogPost>('Blogpost', BlogpostSchema);
