"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsValidation = void 0;
const zod_1 = require("zod");
const createCarValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string({
            required_error: "Brand name is required.",
            invalid_type_error: "Brand name must be a string.",
        }).max(50, "Brand name cannot exceed 50 characters."),
        model: zod_1.z.string({
            required_error: "Model name is required.",
            invalid_type_error: "Model must be a string.",
        }),
        year: zod_1.z.number({
            required_error: "Year is required.",
            invalid_type_error: "Year must be a number.",
        }).min(1886, "The year must be 1886 or later."),
        price: zod_1.z.number({
            required_error: "Price is required.",
            invalid_type_error: "Price must be a number.",
        }).min(0, "Price cannot be negative."),
        category: zod_1.z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
            required_error: "Please specify a valid category.",
        }),
        description: zod_1.z.string({
            required_error: "Description is required.",
            invalid_type_error: "Description must be a string.",
        }).max(500, "Description cannot exceed 500 characters."),
        quantity: zod_1.z.number({
            required_error: "Quantity is required.",
            invalid_type_error: "Quantity must be a number.",
        }).min(0, "Quantity cannot be negative."),
        inStock: zod_1.z.boolean({
            required_error: "Stock availability is required.",
            invalid_type_error: "Stock must be a boolean value.",
        }),
    }),
});
// -------------update product---------------
const updateCarsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        brand: zod_1.z.string().max(50, "Brand name cannot exceed 50 characters.").optional(),
        model: zod_1.z.string().optional(),
        year: zod_1.z.number().min(1886, "The year must be 1886 or later.").optional(),
        price: zod_1.z.number().min(0, "Price cannot be negative.").optional(),
        category: zod_1.z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"]).optional(),
        description: zod_1.z.string().max(500, "Description cannot exceed 500 characters.").optional(),
        quantity: zod_1.z.number().min(0, "Quantity cannot be negative.").optional(),
        inStock: zod_1.z.boolean().optional(),
    }),
});
exports.carsValidation = {
    createCarValidationSchema,
    updateCarsValidationSchema,
};
