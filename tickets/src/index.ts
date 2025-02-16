import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
const DB_URL: string = process.env.DB_URL as string;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined")
  }

  try {
    await mongoose.connect(DB_URL)
    console.log('Connected to DB...')
  } catch (error) {
    console.log(error)
  }
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
  });
}

start()