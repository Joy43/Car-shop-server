"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const carStoreSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        required: [true, " Please provide the brand name."],
        set: (value) => value.toUpperCase(),
        maxlength: 50
    },
    model: {
        type: String,
        required: [true, " Please provide the model name."],
    },
    year: {
        type: Number,
        required: [true, " Please provide the year."],
        min: [1886, "The year must be 1886 or later."],
    },
    price: {
        type: Number,
        required: [true, " Please provide the product price."],
        min: [0, "Price cannot be negative number."],
    },
    category: {
        type: String,
        enum: ["Sedan", "SUV", "Truck", "Coupe", "Convertible"],
        required: [true, " Please specify a valid category."],
    },
    imageUrls: {
        type: [String],
        required: [true, 'Product images are required'],
    },
    description: {
        type: String,
        required: [true, " Please provide a description (maximum 500 characters)."],
        maxlength: [500, "Description cannot exceed 500 characters."],
    },
    quantity: {
        type: Number,
        required: [true, " Please specify the available quantity."],
        min: [0, "Quantity cannot be negative."],
    },
    inStock: {
        type: Boolean,
        required: [true, "Please specify if the product is in stock."],
    },
}, {
    timestamps: true,
});
// Export the model for access another component
const Car = (0, mongoose_1.model)("Car", carStoreSchema);
exports.default = Car;
