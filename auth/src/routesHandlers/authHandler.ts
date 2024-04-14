import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from '../models/user';
import { BarRequestError } from '../errors/bad-request-error';

const currentUserHandler = (req: Request, res: Response) => {
  res.send('current user');
};

const signinHandler = (req: Request, res: Response) => {
  res.send('signin....');
};

const signoutHandler = (req: Request, res: Response) => {
  res.send('signout....');
};

const signupHandler = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
    // throw new Error('Invalid email or password')
    // return res.status(400).send(errors.array())
  }

  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log(`${email} - user already exists`);
    throw new BarRequestError('Email is already in use');
  }
  // create and save
  const user = User.build({ email, password });
  await user.save();

  res.status(201).send(user);
};

export { currentUserHandler, signinHandler, signoutHandler, signupHandler };
