import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketCreatedEvent } from "@vktickets/shared";
import { Ticket } from "../../models/ticket";
import constants from "./constants";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = constants.queueGroupName;

  // onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message): void {}
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data
    const ticket = Ticket.build({ id, title, price })

    await ticket.save()

    msg.ack()
  }
}
