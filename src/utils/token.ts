import dotenv                                        from 'dotenv';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET as string;

export interface AccessTokenPayload {
  id: string;
}

export enum VerifyAccessTokenError {
  Expired,
  Invalid
}

export type VerifyAccessTokenResult = {
  success: true;
  payload: AccessTokenPayload;
} | {
  success: false;
  error  : VerifyAccessTokenError;
}

export const createAccessToken = (payload: AccessTokenPayload) => {
  return jwt.sign({ id: payload.id }, JWT_SECRET);
};

export const verifyAccessToken = (accessToken: string): VerifyAccessTokenResult => {
  try {
    const payload = jwt.verify(accessToken, JWT_SECRET) as AccessTokenPayload;
    return { success: true, payload };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return { success: false, error: VerifyAccessTokenError.Expired };
    }

    if (error instanceof JsonWebTokenError) {
      return { success: false, error: VerifyAccessTokenError.Invalid };
    }

    throw error;
  }
};
