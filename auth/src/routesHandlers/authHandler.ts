import express, { Request, Response } from 'express';
import { validationResult } from 'express-validator'

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
    return res.status(400).send(errors.array())
  }

  const { email, password } = req.body

  console.log('Creating a user...')
  res.send({
    email, password,
  })  
}

export { currentUserHandler, signinHandler, signoutHandler, signupHandler }