import { Types } from 'mongoose';

export interface IProduct {
    name: string;
    category: Types.ObjectId;
    description: string;
    imageUrls: string[];
    price: string;
    discount: string;
    stockQuantity: string;
    brand: Types.ObjectId;
    rating: number;
    isDeleted: boolean;
}
