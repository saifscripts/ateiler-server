"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    zip: { type: String },
    products: [
        {
            product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Query Middleware
orderSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
orderSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
orderSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
