import mongoose from 'mongoose';
import { Order, OrderStatus } from './orders';

// step - An interface describes the props to create a new Ticket
interface TicketAttrs { id: string, title: string, price: number }

// step - An interface that describes the props Ticket "DOCUMENT" has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  isTicketReserved(): Promise<boolean>;
}

// step - An interface that describes the properties that a Ticket "MODEL" has
interface TicketModel extends mongoose.Model<TicketDoc> { build(attrs: TicketAttrs): TicketDoc }

// step
const TicketSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    price: { type: Number, require: true, min: 0 },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      }
    }
  });

// this function is created to overcome typescript checking at the time of creation of new Ticket.
// step - this function is created to overcome typescript checking at the time of creation of new Ticket.
TicketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
}

// Find an order where the ticket is the, ticket we just found and order status is not *CANCELLED*
TicketSchema.methods.isTicketReserved = async function () {
  // this == the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({ ticket: this, status: { $nin: [OrderStatus.Cancelled] } })
  return !!existingOrder // return boolean
}

// step - Ticket Model - step 7 with interfaces
// const Ticket = mongoose.model('Ticket', TicketSchema);
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export { Ticket, TicketDoc };

