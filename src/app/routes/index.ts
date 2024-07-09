import express from 'express';
import { BrandRoutes } from '../modules/brands/brand.route';
import { CategoryRoutes } from '../modules/categories/category.route';
import { ProductRoutes } from '../modules/products/product.route';

const router = express.Router();

const routes = [
    { path: '/products', route: ProductRoutes },
    { path: '/categories', route: CategoryRoutes },
    { path: '/brands', route: BrandRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
