import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { ProductSearchableFields } from './product.constant';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
    const newProduct = await Product.create(payload);
    return newProduct;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(Product.find().populate(''), query)
        .search(ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const products = await productQuery.modelQuery;

    if (!products.length) {
        throw new AppError(httpStatus.NOT_FOUND, 'No product found!');
    }

    return products;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
};
