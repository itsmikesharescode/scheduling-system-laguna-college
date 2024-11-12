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

export const addTeacherSchema = z.object({
  teacherId: z.string().min(1, { message: 'Teacher ID is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().min(1, { message: 'Middle name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  gender: z.string().refine((v) => ['Male', 'Female'].includes(v), {
    message: 'Invalid gender'
  }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  sections: z.array(sectionSchema).min(1, { message: 'At least one section is required' }),
  subjects: z.array(subjectSchema).min(1, { message: 'At least one subject is required' })
});

export type AddTeacherSchema = typeof addTeacherSchema;
