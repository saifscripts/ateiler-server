import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
    const newProduct = await Product.create(payload);
    return newProduct;
};

const getAllProductsFromDB = async () => {
    const products = await Product.find();
    return products;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
};
