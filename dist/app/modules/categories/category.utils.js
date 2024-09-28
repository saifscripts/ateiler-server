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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCategorySlug = void 0;
const category_model_1 = require("./category.model");
function createSlugRegex(slug) {
    const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`^${escapedSlug}(-[1-9])?$`);
}
const generateCategorySlug = (title) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = title.toLowerCase().trim().split(' ').join('-');
    const lastItemWithThisSlug = yield category_model_1.Category.findOne({
        slug: { $regex: createSlugRegex(slug), $options: 'i' },
    }).sort({ createdAt: -1 });
    if (!lastItemWithThisSlug) {
        return slug;
    }
    const slugSplit = lastItemWithThisSlug.slug.split('-');
    const lastItemNumber = slugSplit[slugSplit.length - 1];
    const lastItemNumberInt = parseInt(lastItemNumber) || 0;
    return `${slug}-${lastItemNumberInt + 1}`;
});
exports.generateCategorySlug = generateCategorySlug;
