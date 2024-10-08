import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this?.query?.searchTerm || '';

        this.modelQuery = this.modelQuery.find({
            $or: searchableFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        } as FilterQuery<T>);
        return this;
    }

    filter() {
        const _query = { ...this.query };
        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((field) => delete _query[field]);

        const queryString = JSON.stringify(_query).replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`,
        );

        this.modelQuery = this.modelQuery.find(JSON.parse(queryString));
        return this;
    }

    sort() {
        const sort =
            (this?.query?.sort as string)?.split(',')?.join(' ') ||
            '-createdAt';

        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }

    paginate() {
        const limit = Number(this?.query?.limit);
        const page = Number(this?.query?.page) || 1;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    fields() {
        const fields =
            (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}

export default QueryBuilder;
