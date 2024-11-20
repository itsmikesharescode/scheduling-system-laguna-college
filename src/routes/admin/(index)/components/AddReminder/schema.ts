import { z } from 'zod';

export const addReminderSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  time: z.string().min(1, { message: 'Time is required' })
});

export type AddReminderSchema = typeof addReminderSchema;
