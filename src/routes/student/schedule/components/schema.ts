import { z } from 'zod';

export const reportIssueSchema = z.object({
  userObj: z.string(),
  msg: z.string().min(10, { message: 'Must be more than 10 characters.' })
});

export type ReportIssueSchema = typeof reportIssueSchema;
