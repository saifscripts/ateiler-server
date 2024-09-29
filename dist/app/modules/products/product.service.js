"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const brand_model_1 = require("../brands/brand.model");
const category_model_1 = require("../categories/category.model");
const product_constant_1 = require("./product.constant");
const product_model_1 = require("./product.model");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExists = yield category_model_1.Category.findById(payload.category);
    if (!isCategoryExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Category doesn't Exists");
    }
    const isBrandExists = yield brand_model_1.Brand.findById(payload.brand);
    if (!isBrandExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Brand doesn't Exists");
    }
    const newProduct = yield product_model_1.Product.create(payload);
    return newProduct;
});
const getProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find()
        .populate({ path: 'category', select: 'title' })
        .populate({ path: 'brand', select: 'name' }), query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const products = yield productQuery.modelQuery;
    return products;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id).populate('category brand');
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return product;
});
const updateSingleProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!updatedProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return updatedProduct;
});
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    if (!deletedProduct) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found!');
    }
    return deletedProduct;
});
exports.ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductFromDB,
};
