import express from 'express';
import 'express-async-errors'
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { ticketRouter } from './routes/ticket-routes';
import { errorHandler, NotFoundError, currentUserMiddleware } from '@vktickets/shared';

const app = express();
app.set('trust proxy', true) // ingrss-nginx proxy

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
)

// custom middlewares
app.use(currentUserMiddleware)

// Router
app.use(ticketRouter);

// Throw error when route not found
app.all('*', async () => {
  throw new NotFoundError()
})

// middleware
app.use(errorHandler);

export { app }