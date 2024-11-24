import { z } from 'zod';

export const updateInfoSchema = z.object({
  firstName: z.string().min(1, { message: 'Must enter a valid first name.' }),
  middleName: z.string().min(1, { message: 'Must enter a valid middle name.' }),
  lastName: z.string().min(1, { message: 'Must enter a valid last name.' })
});

export const updateEmailSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' })
});

export const updatePwdSchema = z
  .object({
    newPwd: z.string().min(8, { message: 'Must enter a strong password.' }),
    confirmNewPwd: z.string()
  })
  .superRefine(({ newPwd, confirmNewPwd }, ctx) => {
    if (newPwd !== confirmNewPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must confirm new password.',
        path: ['confirmNewPwd']
      });
    }
  });

export type UpdateInfoSchema = typeof updateInfoSchema;
export type UpdateEmailSchema = typeof updateEmailSchema;
export type UpdatePwdSchema = typeof updatePwdSchema;
