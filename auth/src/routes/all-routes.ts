import express from 'express';
import { body } from 'express-validator'

import { currentUserHandler, signinHandler, signoutHandler, signupHandler } from '../routesHandlers/authHandler'
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router()

const emailValidatorSignup = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters')
]

const emailValidatorSignin = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password').trim().notEmpty().withMessage('Please enter a valid password')
]

router.get('/api/v1/users/currentuser', currentUserHandler)
router.post('/api/v1/users/signin', emailValidatorSignin, validateRequest, signinHandler)
router.post('/api/v1/users/signout', signoutHandler)
// added email validation as an Arguments
router.post('/api/v1/users/signup', emailValidatorSignup, validateRequest, signupHandler)

export {
  router as authRouter
};