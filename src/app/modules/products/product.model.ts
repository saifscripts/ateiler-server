import { Schema, model } from 'mongoose';
import { IInventory, IProduct } from './product.interface';

const InventorySchema = new Schema<IInventory>(
    {
        quantity: { type: Number, required: true },
        inStock: {
            type: Boolean,
            default: function () {
                if (this.quantity > 0) return true;
                return false;
            },
        },
    },
    {
        _id: false,
    },
);

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        price: { type: Number, required: true },
        inventory: { type: InventorySchema, required: true },
        brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
        rating: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

export const Product = model<IProduct>('Product', productSchema);
