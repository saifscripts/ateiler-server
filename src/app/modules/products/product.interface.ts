import { Types } from 'mongoose';

export interface IInventory {
    quantity: number;
    inStock: boolean;
}

export interface IProduct {
    name: string;
    category: Types.ObjectId;
    description: string;
    imageUrl: string;
    price: number;
    inventory: IInventory;
    brand: Types.ObjectId;
    rating: number;
    isDeleted: boolean;
}
