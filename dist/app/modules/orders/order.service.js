"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newOrder = yield order_model_1.Order.create([payload], { session });
        if (!newOrder.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order');
        }
        const updateOperations = newOrder[0].products.map((orderProduct) => ({
            updateOne: {
                filter: { _id: orderProduct.product },
                update: { $inc: { stockQuantity: -orderProduct.quantity } },
            },
        }));
        const updatedProducts = yield product_model_1.Product.bulkWrite(updateOperations, {
            session,
        });
        if (updatedProducts.modifiedCount !== newOrder[0].products.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update product stock quantity');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
});
const getOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderQuery = new QueryBuilder_1.default(order_model_1.Order.find().populate({ path: 'products.product', select: 'name' }), query)
        // .search(OrderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const orders = yield orderQuery.modelQuery;
    return orders;
});
exports.OrderServices = {
    createOrderIntoDB,
    getOrdersFromDB,
};
