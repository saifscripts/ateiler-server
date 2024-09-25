import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        description: { type: String, required: true },
        imageUrls: [{ type: String, required: true }],
        price: { type: String, required: true },
        discount: { type: String, required: true },
        stockQuantity: { type: String, required: true },
        brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
        rating: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

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

export const Product = model<IProduct>('Product', productSchema);
