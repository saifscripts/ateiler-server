import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
    const newOrder = await OrderServices.createOrderIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: 'Order placed successfully!',
        data: newOrder,
    });
});

const getOrders = catchAsync(async (req, res) => {
    const orders = await OrderServices.getOrdersFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Orders fetched successfully!',
        data: orders,
    });
});

export const OrderControllers = {
    createOrder,
    getOrders,
};
