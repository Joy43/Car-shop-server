import { z } from 'zod';

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    role: z.string(),
    name: z.string(),
    email: z.string().email(),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
};