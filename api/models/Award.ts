import { z } from 'zod';

export interface Award {
  id: number;
  title: string;
  description: string;
  dateReceived: Date;
}

export const AwardSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  dateReceived: z.coerce.date(),
});
