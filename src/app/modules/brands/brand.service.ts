import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const createBrandIntoDB = async (payload: IBrand) => {
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
