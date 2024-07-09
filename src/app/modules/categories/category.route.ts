import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryControllers } from './category.controller';
import { CategoryValidations } from './category.validation';

const router = express.Router();

router
    .route('/')
    .post(
        validateRequest(CategoryValidations.createCategoryValidationSchema),
        CategoryControllers.createCategory,
    )
    .get(CategoryControllers.getCategories);

export const CategoryRoutes = router;
