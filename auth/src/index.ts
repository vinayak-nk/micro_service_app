import express, { Request, Response } from 'express';
import { json } from 'body-parser'
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.get('/api/users/currentUser', (req: Request, res: Response) => {
  res.send(`Hi there!!`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
