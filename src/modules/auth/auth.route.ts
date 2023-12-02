import { Router }                     from 'express';
import { body }                       from '@middleware/body.middleware';
import { authController }             from './auth.controller';
import { signInSchema, signUpSchema } from './auth.validation';

export const authRoute = Router();

authRoute.post('/signin', body(signInSchema), authController.signIn);
authRoute.post('/signup', body(signUpSchema), authController.signUp);
