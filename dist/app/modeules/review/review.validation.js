"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string()
            .max(70, "Review cannot exceed 70 characters.")
            .nonempty("Review is required."),
        rating: zod_1.z.number()
            .max(5, "Rating must not exceed 5.")
            .min(1, "Rating must be at least 1."),
        car: zod_1.z.string({
            required_error: "Car ID is required"
        }),
    })
});
exports.ReviewValidation = {
    createReviewValidationSchema
};
