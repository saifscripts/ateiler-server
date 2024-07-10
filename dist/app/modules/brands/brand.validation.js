"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandValidations = void 0;
const zod_1 = require("zod");
const createBrandValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1),
    }),
});
exports.BrandValidations = {
    createBrandValidationSchema,
};
