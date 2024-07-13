import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategoryIntoDB = async (payload: ICategory) => {
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
