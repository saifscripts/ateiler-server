"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brand_route_1 = require("../modules/brands/brand.route");
const category_route_1 = require("../modules/categories/category.route");
const order_route_1 = require("../modules/orders/order.route");
const product_route_1 = require("../modules/products/product.route");
const router = express_1.default.Router();
const routes = [
    { path: '/products', route: product_route_1.ProductRoutes },
    { path: '/categories', route: category_route_1.CategoryRoutes },
    { path: '/brands', route: brand_route_1.BrandRoutes },
    { path: '/orders', route: order_route_1.OrderRoutes },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
