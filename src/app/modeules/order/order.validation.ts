import { z } from 'zod';

const createOrderSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product: z.string().min(1, 'Product ID is required'),
        quantity: z.number().int().min(1, 'Quantity must be at least 1'),
      })
    ).nonempty('At least one product is required'),
    transaction: z.object({
      id: z.string().optional(),
      transactionStatus: z.string().optional(),
      bank_status: z.string().optional(),
      sp_code: z.string().optional(),
      sp_message: z.string().optional(),
      method: z.string().optional(),
      date_time: z.string().optional(),
    }).optional(),
  }),
});

export const updateOrderSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    products: z.array(
      z.object({
        product: z.string().min(1, 'Product ID is required').optional(),
        quantity: z.number().int().min(1, 'Quantity must be at least 1').optional(),
      })
    ).optional(),
    totalPrice: z.number().min(0, 'Total price must be a positive number').optional(),
    status: z.enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled']).optional(),
    transaction: z.object({
      id: z.string().optional(),
      transactionStatus: z.string().optional(),
      bank_status: z.string().optional(),
      sp_code: z.string().optional(),
      sp_message: z.string().optional(),
      method: z.string().optional(),
      date_time: z.string().optional(),
    }).optional(),
  }),
});

export const OrderValidations = {
  createOrderSchema,
  updateOrderSchema,
};