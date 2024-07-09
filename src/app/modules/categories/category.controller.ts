import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
    const newCategory = await CategoryServices.createCategoryIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Category created successfully!',
        data: newCategory,
    });
});

const getCategories = catchAsync(async (_req, res) => {
    const categories = await CategoryServices.getCategoriesFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: 'Categories fetched successfully!',
        data: categories,
    });
});

export const CategoryControllers = {
    createCategory,
    getCategories,
};
