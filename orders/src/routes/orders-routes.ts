import express from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator'

import { requireAuthMiddleware, validateRequest } from '@vktickets/shared';
import ordersHandler from '../routesHandlers/ordersHandler';

const router = express.Router()

const ticketValidator = [
  body('ticketId')
    .notEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // providing valid mongoid
    .withMessage('TicketId is required')
]

router.post('/api/v1/orders', requireAuthMiddleware, ticketValidator, validateRequest, ordersHandler.createOrdersHandler)
router.get('/api/v1/orders/:orderId', requireAuthMiddleware, validateRequest, ordersHandler.readOrdersHandler)
router.get('/api/v1/orders', requireAuthMiddleware, validateRequest, ordersHandler.readAllOrdersHandler)
router.delete('/api/v1/orders/:orderId', requireAuthMiddleware, validateRequest, ordersHandler.deleteOrdersHandler)


export { router as ordersRouter };
