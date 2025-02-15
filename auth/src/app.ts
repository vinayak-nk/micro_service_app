import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { authRouter } from './routes/all-routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true) // ingrss-nginx proxy

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

app.use(authRouter);

// Throw error when route not found
app.all('*', async () => {
  throw new NotFoundError()
})

// middleware
app.use(errorHandler);

export { app }