import { Request, Response } from 'express';
import { validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const currentUserHandler = (req: Request, res: Response) => {
  res.send('current user')
}

const signinHandler = (req: Request, res: Response) => {
  res.send('signin....')
}

const signoutHandler = (req: Request, res: Response) => {
  res.send('signout....')
}

const signupHandler = (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
    // throw new Error('Invalid email or password')
    // return res.status(400).send(errors.array())
  }

  throw new DatabaseConnectionError()

  const { email, password } = req.body

  console.log('Creating a user...')
  res.send({
    email, password,
  })
}

export { currentUserHandler, signinHandler, signoutHandler, signupHandler }