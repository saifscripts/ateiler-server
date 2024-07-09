import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router
    .route('/create-product')
    .post(
        validateRequest(ProductValidations.createProductValidationSchema),
        ProductControllers.createProduct,
    );

router.route('/').get(ProductControllers.getAllProducts);

export const ProductRoutes = router;
