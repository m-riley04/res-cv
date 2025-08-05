import { z } from 'zod';
import { Skill, SkillSchema } from '.';

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  skills: Skill[];
}

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  startDate: z.date(),
  endDate: z.date().optional(),
  url: z.string().optional(),
  skills: z.array(SkillSchema),
});
