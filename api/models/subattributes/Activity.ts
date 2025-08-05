import { ActivityPosition, ActivityPositionSchema } from '@/api/enums';
import { z } from 'zod';

export interface Activity {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  position?: ActivityPosition;
}

export const ActivitySchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  url: z.string().optional(),
  position: ActivityPositionSchema.optional(),
});
