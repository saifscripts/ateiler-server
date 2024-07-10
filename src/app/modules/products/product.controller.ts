import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
    const newProduct = await ProductServices.createProductIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Product created successfully!',
        data: newProduct,
    });
});

const getProducts = catchAsync(async (req, res) => {
    const products = await ProductServices.getProductsFromDB(req.query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Products fetched successfully!',
        data: products,
    });
});

const getSingleProduct = catchAsync(async (req, res) => {
    const product = await ProductServices.getSingleProductFromDB(req.params.id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Product fetched successfully!',
        data: product,
    });
});

export const ProductControllers = {
    createProduct,
    getProducts,
    getSingleProduct,
};
