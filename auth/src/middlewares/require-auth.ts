import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authrized-error';

// import jwt from 'jsonwebtoken';

export const requireAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next()
}
