import { Request, Response } from 'express';
// import { Order } from '../models/orders';
import { Ticket } from '../models/ticket';
import { BadRequestError, NotAuthorizedError, NotFoundError, OrderStatus } from '@vktickets/shared';
import { Order } from '../models/orders';
import { natsWrapper } from '../nats-wrapper';
import { OrderCreatedEventPublisher } from '../events/publishers/order-created-publisher';
import { OrderCancelledEventPublisher } from '../events/publishers/order-cancelled-publisher';

const EXPIRATION_WINDOW_SECONDS = 15 * 60; // 15 minutes

const createOrdersHandler = async (req: Request, res: Response) => {
  const { ticketId } = req.body

  // Find the ticket the user is trying to order in the DB.
  const ticket = await Ticket.findById(ticketId)
  if (!ticket) throw new NotFoundError()

  // Make sure the ticket is not already reserved.
  const isTicketReserved = await ticket.isTicketReserved()
  if (isTicketReserved) throw new BadRequestError('Ticket is already reserved...')

  // Calculate expiration date for this order.
  const expiration = new Date()
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  // Build the order and save it to DB
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket,
  })

  await order.save()

  // Publish an event - order has been created.
  new OrderCreatedEventPublisher(natsWrapper.client).publish({
    id: order.id, // OrderId
    status: order.status,
    userId: order.userId,
    expiresdAt: order.expiresAt.toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price
    },
  })

  res.status(201).send(order)
};

const readOrdersHandler = async (req: Request, res: Response) => {
  const { orderId } = req.params
  const order = await Order.findById(orderId).populate('ticket')

  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError()

  res.send(order)
};

const readAllOrdersHandler = async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser?.id }).populate('ticket')
  res.send(orders)
};

// updating status as cancelled. not deleting any document or resource
const deleteOrdersHandler = async (req: Request, res: Response) => {
  const { orderId } = req.params
  const order = await Order.findById(orderId).populate('ticket')

  if (!order) throw new NotFoundError();
  if (order.userId !== req.currentUser!.id) throw new NotAuthorizedError()

  // update status and save
  order.status = OrderStatus.Cancelled;
  await order.save()

  new OrderCancelledEventPublisher(natsWrapper.client).publish({
    id: order.id, // orderId
    ticket: {
      id: order.ticket.id, // ticket id
    }
  })

  res.status(204).send({})
};


export default { createOrdersHandler, readOrdersHandler, readAllOrdersHandler, deleteOrdersHandler };
