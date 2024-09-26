import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ICategory } from './category.interface';
import { Category } from './category.model';
import { generateCategorySlug } from './category.utils';

const createCategoryIntoDB = async (payload: ICategory) => {
    const isExist = await Category.findOne({ title: payload.title });

    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, 'Category already exists');
    }

    payload.slug = await generateCategorySlug(payload.title);
    const newCategory = await Category.create(payload);
    return newCategory;
};

const getCategoriesFromDB = async () => {
    const categories = Category.find().sort('-createdAt');
    return categories;
};

export const CategoryServices = {
    createCategoryIntoDB,
    getCategoriesFromDB,
};
