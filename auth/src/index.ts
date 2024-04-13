import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import dotenv from 'dotenv';
import { authRouter } from './routes/all-routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';


dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;

app.use(json());

app.use(authRouter);

// Throw error when route not found
app.all('*', () => {
  throw new NotFoundError()
})

// middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
