"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const InventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().int().nonnegative(),
});
const ProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    category: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
        message: 'Invalid category ID',
    }),
    description: zod_1.z.string().min(1),
    imageUrl: zod_1.z.string().url(),
    price: zod_1.z.number().nonnegative(),
    inventory: InventorySchema,
    brand: zod_1.z.string().refine((id) => mongoose_1.Types.ObjectId.isValid(id), {
        message: 'Invalid brand ID',
    }),
    rating: zod_1.z.number().min(0).max(5),
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
