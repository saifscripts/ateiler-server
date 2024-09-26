import { z } from 'zod';

const createBrandValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        logo: z.string().url(),
    }),
});

export const BrandValidations = {
    createBrandValidationSchema,
};
