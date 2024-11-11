import { z } from 'zod';

// Define schema for sections
const sectionSchema = z.object({
  id: z.string().uuid(),
  value: z.string().min(1, { message: 'Section value cannot be empty' })
});

// Define schema for subjects

const scheduleSchema = z.object({
  startTime: z.string().min(1, { message: 'Start time is required' }),
  endTime: z.string().min(1, { message: 'End time is required' }),
  days: z.string().min(1, { message: 'Days are required' })
});

const subjectSchema = z.object({
  name: z.string().min(1, { message: 'Subject name cannot be empty' }),
  schedule: z.array(scheduleSchema).min(1, { message: 'At least one schedule is required' })
});

export const addStudentSchema = z.object({
  studentId: z.string().min(1, { message: 'Student ID is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string().min(1, { message: 'First name is required' }),
  middleName: z.string().min(1, { message: 'Middle name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  gender: z.enum(['male', 'female'], { message: 'Gender is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  yearLevel: z.number().min(1, { message: 'Year level is required' }),
  course: z.string().min(1, { message: 'Course is required' }),
  sections: z.array(sectionSchema, { message: 'Sections are required' }),
  subjects: z.array(subjectSchema, { message: 'Subjects are required' })
});

export type AddStudentSchema = typeof addStudentSchema;
