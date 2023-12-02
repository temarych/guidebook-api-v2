import { User } from '@modules/users/users.model';

export enum SignUpError {
  EmailNotUnique,
  UsernameNotUnique
}

export enum SignInError {
  UserNotFound,
  IncorrectPassword
}

export type AuthResult<Error> =  {
  success    : true;
  user       : User;
  accessToken: string;
} | {
  success: false;
  error  : Error;
}

export type SignUpResult = AuthResult<SignUpError>;
export type SignInResult = AuthResult<SignInError>;
