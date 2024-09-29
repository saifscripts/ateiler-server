import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String },
        zip: { type: String },
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product' },
                quantity: { type: Number, required: true },
            },
        ],
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

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

export const Order = model<IOrder>('Order', orderSchema);
