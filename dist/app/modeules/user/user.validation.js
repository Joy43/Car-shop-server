"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const userValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name must be provided and must be a string",
        })
            .min(3, { message: 'Name must be at least 3 characters long' })
            .max(50, { message: 'Name must be at most 50 characters long' }),
        email: zod_1.z
            .string({
            required_error: "Email must be provided and must be a string",
        })
            .email({ message: 'Invalid email address' }),
        password: zod_1.z
            .string({
            required_error: 'Password is required for your safety purpuse',
        })
            .max(40, { message: 'Password can not be more than 40 characters' }),
    }),
});
exports.UserValidation = {
    userValidationSchema,
};
