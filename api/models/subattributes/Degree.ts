import { z } from 'zod';

export interface Degree {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export const DegreeSchema = z.object({
  id: z.number(),
  title: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  gpa: z.number().optional(),
});
