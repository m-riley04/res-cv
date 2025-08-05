import { z } from 'zod';

export interface Skill {
  id: number;
  name: string;
}

export const SkillSchema = z.object({
  id: z.number(),
  name: z.string(),
});
