import { NextFunction, Request, Response } from 'express';
import { Schema, ZodError }                from 'zod';

export const getErrors = (zodError: ZodError) => {
  return zodError.errors.map((error) => ({
    path   : error.path.join('.'),
    message: zodError.message
  }));
};

export const body = (schema: Schema) => (request: Request, response: Response, next: NextFunction) => {
  const result = schema.safeParse(request.body);

  if (!result.success) {
    return response.status(400).send({
      code  : 'invalid-body',
      errors: getErrors(result.error)
    });
  }

  return next();
};
