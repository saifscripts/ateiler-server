"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidations = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1),
        thumbnail: zod_1.z.string().url(),
    }),
});
exports.CategoryValidations = {
    createCategoryValidationSchema,
};
