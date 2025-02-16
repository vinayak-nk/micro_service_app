import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
const DB_URL: string = process.env.DB_URL as string;
const hostAddress: string = process.env.HOST_IP as string;
const hostPort: number = parseInt(process.env.HOST_PORT as string, 10) || 3000;

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT_KEY must be defined")
  if (!DB_URL) throw new Error("Mongo URL must be defined")
  if (!hostAddress) throw new Error("Service IP must be defined")
  if (!hostPort) throw new Error("Service hostPort must be defined")

  try {
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