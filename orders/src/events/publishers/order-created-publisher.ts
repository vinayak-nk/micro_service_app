import { Publisher, OrderCreatedEvent, Subjects } from "@vktickets/shared";

export class OrderCreatedEventPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}