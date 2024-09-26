import { Schema, model } from 'mongoose';
import { IBrand } from './brand.interface';

const brandSchema = new Schema<IBrand>(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

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

export const Brand = model<IBrand>('Brand', brandSchema);
