import mongoose from 'mongoose';

/*
  there are 2 issues typescript and mongoose integration.

  1. data type mismtach. Eg: string in TS, String in Mongoose
  2. more properties in mongose than to Ticket model we pass. Eg: createdAt, updatedAt etc 

  to over come this need to define TicketModel and Ticketdoc interfaces.
*/

// Step 3 - An interface describes the props to create a new Ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// step 6 - An interface that describes the props Ticket "DOCUMENT" has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// step 5 - An interface that describes the properties that a Ticket "MODEL" has
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}


// step 1
const TicketSchema = new mongoose.Schema({
  title: { type: String, require: true },
  price: { type: Number, require: true },
  userId: { type: String, require: true },
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
    }
  }
},);

// this function is created to overcome typescript checking at the time of creation of new Ticket.
// step 4 - this function is created to overcome typescript checking at the time of creation of new Ticket.
TicketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs);

// step 2 - Ticket Model - step 7 with interfaces
// const Ticket = mongoose.model('Ticket', TicketSchema);
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema);

export { Ticket };

/*
  // test
  const Ticket = Ticket.build({
    title: 'test@test.com',
    price: '123',
    // test: '' // show error
  })
*/
