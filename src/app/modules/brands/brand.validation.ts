import { z } from 'zod';

const createBrandValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
    }),
});

export const BrandValidations = {
    createBrandValidationSchema,
};
