import { z } from 'zod';

const createCategoryValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1),
    }),
});

export const CategoryValidations = {
    createCategoryValidationSchema,
};
