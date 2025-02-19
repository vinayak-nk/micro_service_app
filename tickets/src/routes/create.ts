import express from 'express';
import { body } from 'express-validator'

import { requireAuthMiddleware, validateRequest } from '@vktickets/shared';
import { createTicketHandler } from '../routesHandlers/ticketsHandler';

const router = express.Router()

const ticketValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero!!')
]


router.post('/api/v1/tickets', requireAuthMiddleware, ticketValidator, validateRequest, createTicketHandler)

export { router as createTicketRouter };
