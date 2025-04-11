"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = exports.updateOrderSchema = void 0;
const zod_1 = require("zod");
const createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        products: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string().min(1, 'Product ID is required'),
            quantity: zod_1.z.number().int().min(1, 'Quantity must be at least 1'),
        })).nonempty('At least one product is required'),
        transaction: zod_1.z.object({
            id: zod_1.z.string().optional(),
            transactionStatus: zod_1.z.string().optional(),
            bank_status: zod_1.z.string().optional(),
            sp_code: zod_1.z.string().optional(),
            sp_message: zod_1.z.string().optional(),
            method: zod_1.z.string().optional(),
            date_time: zod_1.z.string().optional(),
        }).optional(),
    }),
});
exports.updateOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format').optional(),
        products: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string().min(1, 'Product ID is required').optional(),
            quantity: zod_1.z.number().int().min(1, 'Quantity must be at least 1').optional(),
        })).optional(),
        totalPrice: zod_1.z.number().min(0, 'Total price must be a positive number').optional(),
        status: zod_1.z.enum(['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled']).optional(),
        transaction: zod_1.z.object({
            id: zod_1.z.string().optional(),
            transactionStatus: zod_1.z.string().optional(),
            bank_status: zod_1.z.string().optional(),
            sp_code: zod_1.z.string().optional(),
            sp_message: zod_1.z.string().optional(),
            method: zod_1.z.string().optional(),
            date_time: zod_1.z.string().optional(),
        }).optional(),
    }),
});
exports.OrderValidations = {
    createOrderSchema,
    updateOrderSchema: exports.updateOrderSchema,
};
