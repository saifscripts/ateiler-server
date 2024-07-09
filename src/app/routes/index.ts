import express from 'express';
import { ProductRoutes } from '../modules/products/product.route';

const router = express.Router();

const routes = [{ path: '/products', route: ProductRoutes }];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
