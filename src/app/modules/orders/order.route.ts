import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderControllers } from './order.controller';
import { OrderValidations } from './order.validation';

const router = express.Router();

router
    .route('/')
    .post(
        validateRequest(OrderValidations.createOrderValidationSchema),
        OrderControllers.createOrder,
    )
    .get(OrderControllers.getOrders);

export const OrderRoutes = router;
