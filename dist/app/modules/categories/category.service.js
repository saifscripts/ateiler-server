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
exports.CategoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const category_model_1 = require("./category.model");
const category_utils_1 = require("./category.utils");
const createCategoryIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield category_model_1.Category.findOne({ title: payload.title });
    if (isExist) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'Category already exists');
    }
    payload.slug = yield (0, category_utils_1.generateCategorySlug)(payload.title);
    const newCategory = yield category_model_1.Category.create(payload);
    return newCategory;
});
const getCategoriesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = category_model_1.Category.find().sort('-createdAt');
    return categories;
});
exports.CategoryServices = {
    createCategoryIntoDB,
    getCategoriesFromDB,
};
