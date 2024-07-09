import { z } from 'zod';

const productValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        price: z.number(),
    }),
});

export const ProductValidations = {
    productValidationSchema,
};
