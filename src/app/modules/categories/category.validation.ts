import { z } from 'zod';

const createCategoryValidationSchema = z.object({
    body: z.object({
        title: z.string().min(1),
        thumbnail: z.string().url(),
    }),
});

export const CategoryValidations = {
    createCategoryValidationSchema,
};
