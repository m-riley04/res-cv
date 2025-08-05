import { z } from 'zod';

export interface Honor {
  id: number;
  title: string;
  description?: string;
  dateReceived: Date;
}

export const HonorSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  dateReceived: z.date(),
});
