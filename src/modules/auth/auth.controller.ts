import { Request, Response }            from 'express';
import { ISignInSchema, ISignUpSchema } from './auth.validation';
import { authService }                  from './auth.service';
import { SignInError, SignUpError }     from './interfaces/auth.interface';

class AuthController {
  public async signUp(request: Request, response: Response) {
    const data   = request.body as ISignUpSchema;
    const result = await authService.signUp(data);

    if (result.success) {
      return response.send({
        accessToken: result.accessToken
      });
    }

    if (result.error === SignUpError.EmailNotUnique) {
      return response.status(400).send({
        code   : 'email-not-unique',
        message: 'Email not unique'
      });
    }

    if (result.error === SignUpError.UsernameNotUnique) {
      return response.status(400).send({
        code   : 'username-not-unique',
        message: 'Username not unique'
      });
    }
  }

  public async signIn(request: Request, response: Response) {
    const data   = request.body as ISignInSchema;
    const result = await authService.signIn(data);

    if (result.success) {
      return response.send({
        accessToken: result.accessToken
      });
    }

    if (result.error === SignInError.UserNotFound) {
      return response.status(401).send({
        code   : 'user-not-found',
        message: 'User not found'
      });
    }

    if (result.error === SignInError.IncorrectPassword) {
      return response.status(401).send({
        code   : 'incorrect-password',
        message: 'Incorrect password'
      });
    }
  }
}

export const authController = new AuthController();
