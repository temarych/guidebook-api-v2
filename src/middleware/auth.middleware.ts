import { NextFunction, Request, Response }           from 'express';
import { VerifyAccessTokenError, verifyAccessToken } from '@utils/token';
import { usersService }                              from '@modules/users/users.service';

export const authorize = async (request: Request, response: Response, next: NextFunction) => {
  const accessToken = request.header('Authorization') ?? null;

  if (accessToken === null) {
    return response.status(401).send({
      code   : 'no-access-token',
      message: 'No access token provided'
    });
  }

  const result = verifyAccessToken(accessToken);

  if (!result.success) {
    switch (result.error) {
      case VerifyAccessTokenError.Expired: {
        return response.status(401).send({
          code   : 'access-token-expired',
          message: 'Access token expired'
        });
      }
      case VerifyAccessTokenError.Invalid: {
        return response.status(401).send({
          code   : 'access-token-expired',
          message: 'Access token expired'
        });
      }
    }
  }

  const user = await usersService.findUserById(result.payload.id);

  if (user === null) {
    return response.status(401).send({
      code   : 'user-not-found',
      message: 'User not found'
    });
  }

  request.user = user;

  return next();
};
