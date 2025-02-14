import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

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
    throw new BadRequestError('Email is already in use');
  }
  // create and save
  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJWT = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY! // Readme: Saving secrets in kubernates pods
  )

  // Store JWT on session object
  // req.session.jwt = userJWT -> it gives ts error
  req.session = {
    jwt: userJWT
  }

  res.status(201).send(user);
};

export { currentUserHandler, signinHandler, signoutHandler, signupHandler };
