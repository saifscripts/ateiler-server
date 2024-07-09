import { Schema, model } from 'mongoose';
import { IProduct } from './product.interface';

const productSchema = new Schema<IProduct>(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Product = model<IProduct>('Product', productSchema);
