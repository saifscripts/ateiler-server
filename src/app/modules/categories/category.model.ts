import { Schema, model } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
    {
        title: { type: String, trim: true, required: true },
        thumbnail: { type: String, required: true },
        slug: {
            type: String,
            unique: true,
            default: function () {
                return this.title.trim().toLowerCase().split(' ').join('-');
            },
        },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

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

export const Category = model<ICategory>('Category', categorySchema);
