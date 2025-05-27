"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatecarStock = void 0;
const cars_model_1 = require("./cars.model");
// Function to update stock dynamically whenever quantity is changed
const updatecarStock = async (carId) => {
    const car = await cars_model_1.Car.findById(carId);
    if (!car)
        return;
    const isInStock = (car.quantity ?? 0) > 0; // Ensure quantity check is safe
    if (car.inStock !== isInStock) {
        await car.updateOne({ _id: carId }, { stock: isInStock });
    }
};
exports.updatecarStock = updatecarStock;
