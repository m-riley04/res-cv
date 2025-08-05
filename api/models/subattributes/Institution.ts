import { z } from 'zod';

export interface Institution {
  id: number;
  name: string;
  location: string; // TODO: use a data type for location?
}

export const InstitutionSchema = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
});
