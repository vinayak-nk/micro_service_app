import express from 'express';
import { body } from 'express-validator'

import { currentUserHandler, signinHandler, signoutHandler, signupHandler } from '../routesHandlers/authHandler'

const router = express.Router()

const emailValidator = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
]

router.get('/api/v1/users/currentuser', currentUserHandler)
router.post('/api/v1/users/signin', signinHandler)
router.post('/api/v1/users/signout', signoutHandler)
// added email validation as an Arguments
router.post('/api/v1/users/signup', emailValidator, signupHandler) 

export { 
  router as authRouter
};