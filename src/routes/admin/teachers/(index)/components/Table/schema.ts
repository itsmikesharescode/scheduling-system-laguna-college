import { z } from 'zod';

// Define schema for sections
const sectionSchema = z.object({
  id: z.string().uuid(),
  value: z.string().min(1, { message: 'Section value cannot be empty' })
});

// Define schema for subjects

const scheduleSchema = z.object({
  id: z.string().uuid(),
  startTime: z.string().min(1, { message: 'Start time is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  day: z.string().min(1, { message: 'Day is required' })
});

const subjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, { message: 'Subject name cannot be empty' }),
  schedules: z.array(scheduleSchema).min(1, { message: 'At least one schedule is required' })
});

export const userSchema = z.object({
  teacherId: z.string().min(1, { message: 'Student ID is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  fullname: z.string().min(1, { message: 'Full name is required' }),
  gender: z.string().refine((v) => ['Male', 'Female'].includes(v), {
    message: 'Invalid gender'
  }),
  sections: z.array(sectionSchema).min(1, { message: 'At least one section is required' }),
  subjects: z.array(subjectSchema).min(1, { message: 'At least one subject is required' })
});

export type UserSchema = z.output<typeof userSchema>;
