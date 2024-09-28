"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QueryBuilder {
    constructor(modelQuery, query) {
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const searchTerm = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.searchTerm) || '';
        this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
        return this;
    }
    filter() {
        const _query = Object.assign({}, this.query);
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((field) => delete _query[field]);
        const queryString = JSON.stringify(_query).replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
        this.modelQuery = this.modelQuery.find(JSON.parse(queryString));
        return this;
    }
    sort() {
        var _a, _b, _c;
        const sort = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sort) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) ||
            '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }
    paginate() {
        var _a, _b;
        const limit = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.limit);
        const page = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
        const skip = (page - 1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b, _c;
        const fields = ((_c = (_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',')) === null || _c === void 0 ? void 0 : _c.join(' ')) || '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
