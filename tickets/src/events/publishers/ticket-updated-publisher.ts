import { Publisher, Subjects, TicketUpdatedEvent } from "@vktickets/shared";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}



