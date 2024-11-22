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

export const reportSchema = z.object({
  created_at: z.string(),
  id: z.number(),
  message: z.string(),
  reporter_id: z.string(),
  status: z.string(),
  user_id: z.string()
});

export type ReportPageSchema = z.output<typeof reportSchema>;
