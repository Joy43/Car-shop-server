"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceBlogpost = void 0;
const blog_model_1 = require("./blog.model");
// Create a new blog post
const CreateBlogPost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blogpost.create(data);
    return result;
});
// Get all blog posts
const GetAllBlogPost = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blogpost.find();
    return result;
});
// Get single blog post by ID
const GetSingleBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blogpost.findById(id);
    return result;
});
// Update blog post by ID
const UpdateBlogById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blogpost.findByIdAndUpdate(id, data, { new: true });
    return result;
});
const DeleteBlogById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blogpost.deleteOne({ blogId: id });
    return result;
});
exports.ServiceBlogpost = {
    CreateBlogPost,
    GetAllBlogPost,
    GetSingleBlogById,
    DeleteBlogById,
    UpdateBlogById
};
