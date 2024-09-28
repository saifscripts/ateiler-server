"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    title: { type: String, trim: true, required: true },
    thumbnail: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
// Query Middleware
categorySchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
categorySchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
categorySchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
