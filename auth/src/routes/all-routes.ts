import express from 'express';

import { currentUserHandler, signinHandler, signoutHandler, signupHandler } from '../routesHandlers/authHandler'

const router = express.Router()

router.get('/api/v1/users/currentuser', currentUserHandler)
router.post('/api/v1/users/signin', signinHandler)
router.post('/api/v1/users/signout', signoutHandler)
router.post('/api/v1/users/signup', signupHandler)

export { 
  router as authRouter
};