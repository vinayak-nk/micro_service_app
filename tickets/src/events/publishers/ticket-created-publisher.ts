import { Publisher, Subjects, TicketCreatedEvent } from "@vktickets/shared";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}



