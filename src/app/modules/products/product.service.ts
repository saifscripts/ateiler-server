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

const getSingleProductFromDB = async (id: string) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
    }

    return product;
};

const updateSingleProductIntoDB = async (
    id: string,
    payload: Partial<IProduct>,
) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    if (!updatedProduct) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
    }

    return updatedProduct;
};

const deleteSingleProductFromDB = async (id: string) => {
    const deletedProduct = await Product.findByIdAndUpdate(
        id,
        { isDeleted: true },
        {
            new: true,
            runValidators: true,
        },
    );

    if (!deletedProduct) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
    }

    return deletedProduct;
};

export const ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductFromDB,
};
