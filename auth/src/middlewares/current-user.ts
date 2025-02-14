import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Property 'currentUser' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.ts(2339)
interface UserPayload {
  id: string
  email: string
}

declare module 'express' {
  interface Request {
    currentUser?: UserPayload;
  }
}

export const currentUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next()
  }

  // jwt.verify() throws error if verification fails. So enclose in try-catch block.
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload
  } catch (error) {
    console.log(error)
  }

  next()
}
