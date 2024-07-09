"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidations = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        price: zod_1.z.number(),
    }),
});
exports.ProductValidations = {
    productValidationSchema,
};
