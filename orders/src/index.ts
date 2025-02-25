import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';

dotenv.config();
const DB_URL: string = process.env.DB_URL as string;
const hostAddress: string = process.env.HOST_IP as string;
const hostPort: number = parseInt(process.env.HOST_PORT as string, 10) || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined")
  if (!DB_URL) throw new Error("Mongo URL must be defined")
  if (!hostAddress) throw new Error("Service IP must be defined")
  if (!hostPort) throw new Error("Service hostPort must be defined")
  if (!process.env.NATS_URL) throw new Error("NATS_URL must be defined")
  if (!process.env.NATS_CLUSTER_ID) throw new Error("NATS_CLUSTER_ID must be defined")
  if (!process.env.NATS_CLIENT_ID) throw new Error("NATS_CLIENT_ID must be defined")


  try {
    // NATS connection
    // const clientId = randomUUID()
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    const client = natsWrapper.client
    client.on('close', () => {
      console.log('NATS connection closed...!')
      process.exit()
    })
    process.on('SIGINT', () => client.close()) // interrupt
    process.on('SIGTERM', () => client.close()) // terminate

    // Initialize event listeners
    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    // Mongoose Connection
    await mongoose.connect(DB_URL)
    console.log('Connected to DB...')
  } catch (error) {
    console.log(error)
  }
  app.listen(hostPort, hostAddress, () => {
    console.log(`Server is running on port ${hostPort}`);
  });
}

start()