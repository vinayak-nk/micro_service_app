import express from 'express';
import { body } from 'express-validator'

import { requireAuthMiddleware, validateRequest } from '@vktickets/shared';
import ticketsHandler from '../routesHandlers/ticketsHandler';

const router = express.Router()

const ticketValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than zero!!')
]


router.post('/api/v1/tickets', requireAuthMiddleware, ticketValidator, validateRequest, ticketsHandler.createTicketHandler)
router.get('/api/v1/tickets/:id', requireAuthMiddleware, validateRequest, ticketsHandler.readTicketHandler)
router.get('/api/v1/tickets', requireAuthMiddleware, validateRequest, ticketsHandler.readAllTicketHandler)
router.put('/api/v1/tickets/:id', requireAuthMiddleware, ticketValidator, validateRequest, ticketsHandler.updateTicketHandler)

export { router as ticketRouter };
