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
exports.updatecarStock = void 0;
const cars_model_1 = require("./cars.model");
// Function to update stock dynamically whenever quantity is changed
const updatecarStock = (carId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const car = yield cars_model_1.Car.findById(carId);
    if (!car)
        return;
    const isInStock = ((_a = car.quantity) !== null && _a !== void 0 ? _a : 0) > 0; // Ensure quantity check is safe
    if (car.inStock !== isInStock) {
        yield car.updateOne({ _id: carId }, { stock: isInStock });
    }
});
exports.updatecarStock = updatecarStock;
