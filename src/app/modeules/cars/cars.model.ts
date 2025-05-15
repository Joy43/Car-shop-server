import { Schema, model } from "mongoose";
import { Tcars } from "./cars.interface";


const carStoreSchema = new Schema<Tcars>(
  {         
    brand: {
      type: String,
      required: [true, " Please provide the brand name."],
      set: (value: string) => value.toUpperCase(),
      maxlength:50
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
      enum: ["Sedan", "SUV", "Truck", "Coupe", "Convertible","BMW","Tesla Cybertruck"],
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
   
  },
  {
    timestamps: true,
  }
);

// Export the model for access another component
// const Car = model<Tcars>("Car", carStoreSchema);
// export default Car;
export const Car=model<Tcars>("Car", carStoreSchema);