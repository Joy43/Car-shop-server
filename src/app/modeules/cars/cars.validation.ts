import { z } from "zod";

const createCarValidationSchema = z.object({
  body: z.object({
    brand: z.string({
      required_error: "Brand name is required.",
      invalid_type_error: "Brand name must be a string.",
    }).max(50, "Brand name cannot exceed 50 characters."),
    
    model: z.string({
      required_error: "Model name is required.",
      invalid_type_error: "Model must be a string.",
    }),

    year: z.number({
      required_error: "Year is required.",
      invalid_type_error: "Year must be a number.",
    }).min(1886, "The year must be 1886 or later."),

    price: z.number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number.",
    }).min(0, "Price cannot be negative."),

    category: z.enum(["Sedan", "SUV", "Truck", "Coupe", "Convertible"], {
      required_error: "Please specify a valid category.",
    }),

    description: z.string({
      required_error: "Description is required.",
      invalid_type_error: "Description must be a string.",
    }).max(500, "Description cannot exceed 500 characters."),

    quantity: z.number({
      required_error: "Quantity is required.",
      invalid_type_error: "Quantity must be a number.",
    }).min(0, "Quantity cannot be negative."),

    inStock: z.boolean({
      required_error: "Stock availability is required.",
      invalid_type_error: "Stock must be a boolean value.",
    }),
  }),
});

const updateCarsValidationSchema = z.object({
    body: z.object({
       brand: z.string().optional(),
        model: z.string().optional(),
    }),
});
export  const carsValidation ={
    createCarValidationSchema,
    
 updateCarsValidationSchema
}
