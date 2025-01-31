import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name must be provided and must be a string",
      })
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(50, { message: 'Name must be at most 50 characters long' }),

    email: z
      .string({
        required_error: "Email must be provided and must be a string",
      })
      .email({ message: 'Invalid email address' }),

    password: z
      .string({
        required_error: 'Password is required for your safety purpuse',
      })
      .max(40, { message: 'Password can not be more than 40 characters' }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};