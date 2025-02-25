import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketUpdatedEvent } from "@vktickets/shared";
import { Ticket } from "../../models/ticket";
import constants from "./constants";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = constants.queueGroupName;

  // onMessage(data: { id: string; title: string; price: number; userId: string; }, msg: Message): void {}
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const { id, title, price, version } = data
    // const ticket = await Ticket.findById(id)
    const ticket = await Ticket.findOne({
      _id: id,
      version: version - 1 // update only if version - 1 is found. to overcome issue of race condition.
    })

    if (!ticket) throw new Error('Ticket not found in the listener!')

    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
