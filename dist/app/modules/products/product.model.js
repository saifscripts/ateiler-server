"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: { type: String, required: true },
    imageUrls: [{ type: String, required: true }],
    price: { type: Number, required: true },
    discount: { type: String, required: true },
    stockQuantity: { type: String, required: true },
    brand: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Brand', required: true },
    rating: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Query Middleware
productSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
