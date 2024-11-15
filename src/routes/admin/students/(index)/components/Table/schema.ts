import { z } from 'zod';

// Define schema for sections
const sectionSchema = z.object({
  id: z.string(),
  value: z.string()
});

// Define schema for subjects

const scheduleSchema = z.object({
  id: z.string(),
  day: z.string(),
  endTime: z.string(),
  startTime: z.string()
});

const subjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  schedules: z.array(scheduleSchema)
});

export const userSchema = z.object({
  userId: z.string(),
  createdAt: z.string(),
  role: z.literal('student'),
  studentId: z.string().min(1, { message: 'Student ID is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  fullName: z.string().min(1, { message: 'Full name is required' }),
  gender: z.string().refine((v) => ['Male', 'Female'].includes(v), {
    message: 'Invalid gender'
  }),
  yearLevel: z
    .string()
    .refine((v) => ['First Year', 'Second Year', 'Third Year', 'Fourth Year'].includes(v), {
      message: 'Invalid year level'
    }),
  course: z.string().refine((v) => ['BSIS', 'BSCS', 'BSIT'].includes(v), {
    message: 'Invalid course'
  }),
  sections: z.array(sectionSchema).min(1, { message: 'At least one section is required' }),
  subjects: z.array(subjectSchema).min(1, { message: 'At least one subject is required' })
});

export type UserSchema = z.output<typeof userSchema>;
