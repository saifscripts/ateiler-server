"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const zod_1 = require("zod");
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).min(1, {
            message: 'Name is required',
        }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email({
            message: 'Invalid email address',
        }),
        phone: zod_1.z.string({ required_error: 'Phone number is required' }).min(1, {
            message: 'Phone number is required',
        }),
        address: zod_1.z.string({ required_error: 'Address is required' }).min(1),
        city: zod_1.z.string().min(1).optional(),
        zip: zod_1.z.string().min(1).optional(),
        products: zod_1.z.array(zod_1.z.object({
            product: zod_1.z.string({ required_error: 'Product ID is required' }),
            quantity: zod_1.z
                .number({ required_error: 'Quantity is required' })
                .min(1, {
                message: 'Quantity must be greater than 0',
            }),
        })),
    }),
});
exports.OrderValidations = {
    createOrderValidationSchema,
};
