import { z } from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    review: z.string()
      .max(70, "Review cannot exceed 70 characters.")
      .nonempty("Review is required."),
      
    rating: z.number()
      .max(5, "Rating must not exceed 5.")
      .min(1, "Rating must be at least 1."),
    
    car: z.string({
      required_error: "Car ID is required"
    }),
  })
});


export const ReviewValidation={
    createReviewValidationSchema
}