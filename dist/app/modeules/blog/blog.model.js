"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blogpost = void 0;
const mongoose_1 = require("mongoose");
const BlogpostSchema = new mongoose_1.Schema({
    title: String,
    content: String,
    excerpt: String,
    featuredImage: String,
    tags: [String]
}, {
    timestamps: true,
});
exports.Blogpost = (0, mongoose_1.model)('Blogpost', BlogpostSchema);
