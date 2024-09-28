"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Query Middleware
brandSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
brandSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
brandSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Brand = (0, mongoose_1.model)('Brand', brandSchema);
