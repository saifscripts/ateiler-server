import { z } from 'zod';

const createOrderValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }).min(1, {
            message: 'Name is required',
        }),
        email: z.string({ required_error: 'Email is required' }).email({
            message: 'Invalid email address',
        }),
        phone: z.string({ required_error: 'Phone number is required' }).min(1, {
            message: 'Phone number is required',
        }),
        address: z.string({ required_error: 'Address is required' }).min(1),
        city: z.string().min(1).optional(),
        zip: z.string().min(1).optional(),
        products: z.array(
            z.object({
                product: z.string({ required_error: 'Product ID is required' }),
                quantity: z
                    .number({ required_error: 'Quantity is required' })
                    .min(1, {
                        message: 'Quantity must be greater than 0',
                    }),
            }),
        ),
    }),
});

export const OrderValidations = {
    createOrderValidationSchema,
};
