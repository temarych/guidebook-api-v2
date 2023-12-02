import { z } from 'zod';

export const signUpSchema = z.object({
  email   : z.string().min(1).email(),
  username: z.string().min(1),
  password: z.string().min(1)
});

export const signInSchema = z.object({
  email   : z.string().min(1).email(),
  password: z.string().min(1)
});

export type ISignUpSchema = z.infer<typeof signUpSchema>;
export type ISignInSchema = z.infer<typeof signInSchema>;
