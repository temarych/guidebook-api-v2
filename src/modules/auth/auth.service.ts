import { User }                           from '@modules/users/users.model';
import { usersService }                   from '@modules/users/users.service';
import { comparePasswords, hashPassword } from '@utils/password';
import { createAccessToken }              from '@utils/token';
import {
  SignInError,
  SignInResult,
  SignUpError,
  SignUpResult
}                                         from './interfaces/auth.interface';

class AuthService {
  public async signUp(data: Omit<User, 'id' | 'createdAt'>): Promise<SignUpResult> {
    const isEmailUnique = await usersService.isEmailUnique(data.email);

    if (!isEmailUnique) {
      return { success: false, error: SignUpError.EmailNotUnique };
    }

    const isUsernameUnique = await usersService.isUsernameUnique(data.username);

    if (!isUsernameUnique) {
      return { success: false, error: SignUpError.UsernameNotUnique };
    }

    const password    = await hashPassword(data.password);
    const user        = await usersService.createUser({ ...data, password });
    const accessToken = createAccessToken(user);

    return { success: true, user, accessToken };
  }

  public async signIn(data: Pick<User, 'email' | 'password'>): Promise<SignInResult> {
    const user = await usersService.findUserByEmail(data.email);

    if (user === null) {
      return { success: false, error: SignInError.UserNotFound };
    }
    
    const isCorrectPassword = comparePasswords(data.password, user.password);

    if (!isCorrectPassword) {
      return { success: false, error: SignInError.IncorrectPassword };
    }

    const accessToken = createAccessToken(user);

    return { success: true, user, accessToken };
  }
}

export const authService = new AuthService();
