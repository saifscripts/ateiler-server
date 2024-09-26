import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrandIntoDB = async (payload: IBrand) => {
    const isExist = await Brand.findOne({ name: payload.name });

    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, 'Brand already exists');
    }
    const newBrand = await Brand.create(payload);
    return newBrand;
};

const getBrandsFromDB = async () => {
    const brands = Brand.find();
    return brands;
};

export const BrandServices = {
    createBrandIntoDB,
    getBrandsFromDB,
};
