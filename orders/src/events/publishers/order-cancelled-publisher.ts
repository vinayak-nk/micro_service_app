import { Publisher, OrderCancelledEvent, Subjects } from "@vktickets/shared";

export class OrderCancelledEventPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}