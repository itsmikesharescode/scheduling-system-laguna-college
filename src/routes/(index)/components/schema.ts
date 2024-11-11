import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' })
});
export type LoginSchema = typeof loginSchema;

export const forgotPwdSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' })
});
export type ForgotPwdSchema = typeof forgotPwdSchema;
