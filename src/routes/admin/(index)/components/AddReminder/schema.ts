import { z } from 'zod';

export const addReminderSchema = z.object({
  title: z.string().min(1),
  time: z.string().min(1)
});

export type AddReminderSchema = typeof addReminderSchema;
