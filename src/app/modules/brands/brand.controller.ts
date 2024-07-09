import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BrandServices } from './brand.service';

const createBrand = catchAsync(async (req, res) => {
    const newBrand = await BrandServices.createBrandIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Brand created successfully!',
        data: newBrand,
    });
});

const getBrands = catchAsync(async (_req, res) => {
    const brands = await BrandServices.getBrandsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Brands fetched successfully!',
        data: brands,
    });
});

export const BrandControllers = {
    createBrand,
    getBrands,
};
