import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
    const newProduct = await ProductServices.createProductIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
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

const updateSingleProduct = catchAsync(async (req, res) => {
    const updatedProduct = await ProductServices.updateSingleProductIntoDB(
        req.params.id,
        req.body,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Product updated successfully!',
        data: updatedProduct,
    });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
    const deletedProduct = await ProductServices.deleteSingleProductFromDB(
        req.params.id,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Product deleted successfully!',
        data: deletedProduct,
    });
});

export const ProductControllers = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
