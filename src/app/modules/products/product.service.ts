import httpStatus from 'http-status';
import QueryBuilder from '../../builders/QueryBuilder';
import AppError from '../../errors/AppError';
import { Brand } from '../brands/brand.model';
import { Category } from '../categories/category.model';
import { ProductSearchableFields } from './product.constant';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: IProduct) => {
    const isCategoryExists = await Category.findById(payload.category);

    if (!isCategoryExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "Category doesn't Exists");
    }

    const isBrandExists = await Brand.findById(payload.brand);

    if (!isBrandExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "Brand doesn't Exists");
    }

    const newProduct = await Product.create(payload);
    return newProduct;
};

const getProductsFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(
        Product.find(),
        // .populate({ path: 'category', select: 'title' })
        // .populate({ path: 'brand', select: 'name' }),
        query,
    )
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
    getProductsFromDB,
};
