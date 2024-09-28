"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const ProductSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Name is required!',
    })
        .min(1, 'Name is required!'),
    category: zod_1.z
        .string({
        required_error: 'Category is required!',
    })
        .refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
        message: 'Invalid category ID',
    }),
    description: zod_1.z
        .string({
        required_error: 'Description is required!',
    })
        .min(1, 'Description is required!'),
    imageUrls: zod_1.z
        .array(zod_1.z
        .string({
        required_error: 'Image Url is invalid!',
        invalid_type_error: 'Invalid image!',
    })
        .url('Image Url is invalid!'), {
        required_error: 'Image is required!',
    })
        .min(1, 'Image is required!'),
    price: zod_1.z
        .string({
        required_error: 'Price is required!',
    })
        .min(1, 'Price is required!')
        .refine((val) => !Number.isNaN(Number(val)) && Number(val) >= 0, {
        message: 'Price must be a non negative number',
    }),
    discount: zod_1.z
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
    stockQuantity: zod_1.z
        .string({
        required_error: 'Discount is required!',
    })
        .min(1, 'Quantity is required!')
        .refine((val) => Number.isInteger(Number(val)) && Number(val) >= 0, {
        message: 'Quantity must be a non negative integer',
    }),
    brand: zod_1.z
        .string({
        required_error: 'Brand is required!',
    })
        .refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
        message: 'Invalid brand ID',
    }),
    rating: zod_1.z
        .number()
        .min(0, 'Rating should be a number between 1 to 5')
        .max(5, 'Rating should be a number between 1 to 5')
        .default(5),
});
const createProductValidationSchema = zod_1.z.object({
    body: ProductSchema,
});
const updateProductValidationSchema = zod_1.z.object({
    body: ProductSchema.partial(),
});
exports.ProductValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
