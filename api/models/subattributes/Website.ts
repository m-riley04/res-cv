import { z } from 'zod';

export interface Website {
  id: number;
  url: string;
  label: string;
}

export const WebsiteSchema = z.object({
  id: z.number(),
  url: z.string(),
  label: z.string(),
});
