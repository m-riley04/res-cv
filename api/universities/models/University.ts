import { z } from 'zod';

export interface University {
  name: string;
  domains: string[];
  web_pages: string[];
  country: string;
  alpha_two_code: string;
  'state-province'?: string;
}

export const UniversitySchema = z.object({
  name: z.string(),
  domains: z.array(z.string()),
  web_pages: z.array(z.string()),
  country: z.string(),
  alpha_two_code: z.string().length(2),
  'state-province': z.string().optional(),
});
