import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
// import { validationResult } from 'express-validator';
// import { RequestValidationError } from '../errors/request-validation-error';
// import { DatabaseConnectionError } from '../errors/database-connection-error';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const currentUserHandler = (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }

  // jwt.verify() throws error if verification fails. So enclose in try-catch block.
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)

    res.send({ currentUser: payload })
  } catch (error) {
    res.send({ currentUser: null })
  }
};

const signinHandler = async (req: Request, res: Response) => {
  /*
    Snippet not required as validateRequest middleware is added in routes
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new RequestValidationError(errors.array())
  */

  const { email, password } = req.body

  const existingUser = await User.findOne({ email: email })
  if (!existingUser) throw new BadRequestError('Invalid credentials')

  const passwordMatch = await Password.compare(existingUser.password, password)
  if (!passwordMatch) throw new BadRequestError('Invalid credentials')

  // Generate JWT
  const userJWT = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    process.env.JWT_KEY! // Readme: Saving secrets in kubernates pods
  )

  // Store JWT on session object
  req.session = {
    jwt: userJWT
  }

  res.status(200).send(existingUser);
};

const signoutHandler = (req: Request, res: Response) => {
  req.session = null // JWT toekn removed from session
  res.send({});
};

const signupHandler = async (req: Request, res: Response) => {
  /*
    Snippet not required as validateRequest middleware is added in routes
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
      // throw new Error('Invalid email or password')
      // return res.status(400).send(errors.array())
    }
  */

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
