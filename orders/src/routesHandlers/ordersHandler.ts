import { Request, Response } from 'express';
// import { Orders } from '../models/';
// import { NotAuthorizedError, NotFoundError } from '@vktickets/shared';
// import { natsWrapper } from '../nats-wrapper';

const createOrdersHandler = async (req: Request, res: Response) => {
  res.send({})
};

const readOrdersHandler = async (req: Request, res: Response) => {
  res.send({})
};

const readAllOrdersHandler = async (req: Request, res: Response) => {
  res.send({})
};

const deleteOrdersHandler = async (req: Request, res: Response) => {
  res.send({})
};


export default { createOrdersHandler, readOrdersHandler, readAllOrdersHandler, deleteOrdersHandler };
