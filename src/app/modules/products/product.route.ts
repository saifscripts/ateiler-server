import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router
    .route('/')
    .post(
        validateRequest(ProductValidations.createProductValidationSchema),
        ProductControllers.createProduct,
    )
    .get(ProductControllers.getProducts);

router
    .route('/:id')
    .get(ProductControllers.getSingleProduct)
    .put(
        validateRequest(ProductValidations.updateProductValidationSchema),
        ProductControllers.updateSingleProduct,
    )
    .delete(ProductControllers.deleteSingleProduct);

export const ProductRoutes = router;
