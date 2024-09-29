import { Types } from 'mongoose';

export interface IProduct {
    name: string;
    category: Types.ObjectId;
    description: string;
    imageUrls: string[];
    price: number;
    discount: string;
    stockQuantity: number;
    brand: Types.ObjectId;
    rating: number;
    isDeleted: boolean;
}
