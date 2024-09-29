import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { Product } from '../products/product.model';
import { IOrder, IOrderProduct } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: IOrder) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        const newOrder = await Order.create([payload], { session });

        if (!newOrder.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to create order',
            );
        }

        const updateOperations = newOrder[0].products.map(
            (orderProduct: IOrderProduct) => ({
                updateOne: {
                    filter: { _id: orderProduct.product },
                    update: { $inc: { stockQuantity: -orderProduct.quantity } },
                },
            }),
        );

        const updatedProducts = await Product.bulkWrite(updateOperations, {
            session,
        });

        if (updatedProducts.modifiedCount !== newOrder[0].products.length) {
            throw new AppError(
                httpStatus.BAD_REQUEST,
                'Failed to update product stock quantity',
            );
        }

        await session.commitTransaction();
        await session.endSession();
        return newOrder;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw error;
    }
};

const getOrdersFromDB = async (query: Record<string, unknown>) => {
    const orderQuery = new QueryBuilder(
        Order.find().populate({ path: 'products.product', select: 'name' }),
        query,
    )
        // .search(OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const orders = await orderQuery.modelQuery;

    return orders;
};

export const OrderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
};
