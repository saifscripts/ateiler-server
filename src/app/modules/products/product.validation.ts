import { Types } from 'mongoose';
import { z } from 'zod';

const ProductSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required!',
        })
        .min(1, 'Name is required!'),
    category: z
        .string({
            required_error: 'Category is required!',
        })
        .refine((id) => Types.ObjectId.isValid(id), {
            message: 'Invalid category ID',
        }),
    description: z
        .string({
            required_error: 'Description is required!',
        })
        .min(1, 'Description is required!'),
    imageUrls: z.array(
        z
            .string({
                required_error: 'Image Url is invalid!',
            })
            .url('Image Url is invalid!'),
        {
            required_error: 'Image is Required!',
        },
    ),
    price: z
        .string({
            required_error: 'Price is required!',
        })
        .min(1, 'Price is required!')
        .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, {
            message: 'Price must be a non negative number',
        }),
    discount: z
        .string({
            required_error: 'Discount is required!',
        })
        .min(1, 'Discount is required!')
        .default('0')
        .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
            message: 'Discount must be a non negative integer',
        })
        .refine((val) => Number(val) <= 100, {
            message: 'Discount cannot be more than 100%',
        }),
    stockQuantity: z
        .string({
            required_error: 'Discount is required!',
        })
        .min(1, 'Quantity is required!')
        .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
            message: 'Quantity must be a non negative integer',
        }),
    brand: z
        .string({
            required_error: 'Brand is required!',
        })
        .refine((id) => Types.ObjectId.isValid(id), {
            message: 'Invalid brand ID',
        }),
    rating: z
        .number()
        .min(0, 'Rating should be a number between 1 to 5')
        .max(5, 'Rating should be a number between 1 to 5')
        .default(5),
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
