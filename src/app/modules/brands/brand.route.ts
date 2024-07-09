import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BrandControllers } from './brand.controller';
import { BrandValidations } from './brand.validation';

const router = express.Router();

router
    .route('/')
    .post(
        validateRequest(BrandValidations.createBrandValidationSchema),
        BrandControllers.createBrand,
    )
    .get(BrandControllers.getBrands);

export const BrandRoutes = router;
