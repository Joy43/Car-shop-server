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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerBlogpost = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const sendRequest_1 = __importDefault(require("../utils/sendRequest"));
const blog_service_1 = require("./blog.service");
// Create blog post
const CreateBlogPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('car', req.body);
    const result = yield blog_service_1.ServiceBlogpost.CreateBlogPost(req.body);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        message: "Blog created successfully",
        success: true,
        data: result,
    });
}));
// Get all blog posts
const GetAllBlogPost = (0, catchAsync_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.ServiceBlogpost.GetAllBlogPost();
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "All blogs fetched successfully",
        success: true,
        data: result,
    });
}));
// Get single blog post by ID
const GetSingleBlogById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield blog_service_1.ServiceBlogpost.GetSingleBlogById(id);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog fetched successfully",
        success: true,
        data: result,
    });
}));
// delete blog post by ID
const DeleteBlogsByID = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { blogId } = req.params;
    const result = yield blog_service_1.ServiceBlogpost.DeleteBlogById(blogId);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog fetched successfully",
        success: true,
        data: result,
    });
}));
// UpdateBlogById blog post by ID
const UpdateBlogById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updateData = req.body;
    const result = yield blog_service_1.ServiceBlogpost.UpdateBlogById(id, updateData);
    (0, sendRequest_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Blog updated successfully",
        success: true,
        data: result,
    });
}));
exports.ControllerBlogpost = {
    CreateBlogPost,
    GetAllBlogPost,
    GetSingleBlogById,
    DeleteBlogsByID,
    UpdateBlogById
};
