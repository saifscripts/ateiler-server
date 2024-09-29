import { Types } from 'mongoose';

export interface IOrderProduct {
    product: Types.ObjectId;
    quantity: number;
}

export interface IOrder {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
    isDeleted: boolean;
    products: IOrderProduct[];
}
