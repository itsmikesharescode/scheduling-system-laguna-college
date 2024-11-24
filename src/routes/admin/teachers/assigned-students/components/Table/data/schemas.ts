import { z } from 'zod';

// Define schema for sections
const sectionSchema = z.object({
  id: z.string().uuid(),
  value: z.string()
});

// Define schema for subjects

const scheduleSchema = z.object({
  id: z.string().uuid(),
  startTime: z.string(),
  endTime: z.string(),
  day: z.string()
});

const subjectSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  schedules: z.array(scheduleSchema)
});

export const studentsSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  created_at: z.string(),
  studentId: z.string(),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  yearLevel: z.string(),
  course: z.string(),
  email: z.string(),
  sections: z.array(sectionSchema),
  subjects: z.array(subjectSchema)
});

export type StudentPageSchema = z.output<typeof studentsSchema>;
