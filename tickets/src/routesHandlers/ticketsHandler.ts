import { Request, Response } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@vktickets/shared';


const createTicketHandler = async (req: Request, res: Response) => {
  const { title, price } = req.body
  const ticket = Ticket.build({ title, price, userId: req.currentUser!.id })
  await ticket.save()

  res.status(201).send({ ticket });
};

const readTicketHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const ticket = await Ticket.findById(id)

  if (!ticket) throw new NotFoundError();

  res.status(200).send({ ticket })
};

const readAllTicketHandler = async (req: Request, res: Response) => {
  const tickets = await Ticket.find({})

  if (!tickets) throw new NotFoundError();

  res.status(200).send(tickets)
};


export default { createTicketHandler, readTicketHandler, readAllTicketHandler };
