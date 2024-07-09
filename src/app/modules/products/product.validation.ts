import { Types } from 'mongoose';
import { z } from 'zod';

const InventorySchema = z.object({
    quantity: z.number().int().nonnegative(),
});

const ProductSchema = z.object({
    name: z.string().min(1),
    category: z.string().refine((id) => Types.ObjectId.isValid(id), {
        message: 'Invalid category ID',
    }),
    description: z.string().min(1),
    imageUrl: z.string().url(),
    price: z.number().nonnegative(),
    inventory: InventorySchema,
    brand: z.string().refine((id) => Types.ObjectId.isValid(id), {
        message: 'Invalid brand ID',
    }),
    rating: z.number().min(0).max(5),
});

const createProductValidationSchema = z.object({
    body: ProductSchema,
});

const updateProductValidationSchema = z.object({
    body: ProductSchema.partial(),
});

export const ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
