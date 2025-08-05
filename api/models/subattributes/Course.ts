import { z } from 'zod';
import { Skill, SkillSchema } from '..';

export interface Course {
  id: number;
  title: string;
  code: string;
  description?: string;
  credits?: number;
  grade?: string; // e.g., "A", "B+", etc.
  skills?: Skill[];
  url?: string;
}

export const CourseSchema = z.object({
  id: z.number(),
  title: z.string(),
  code: z.string(),
  description: z.string().optional(),
  credits: z.number().optional(),
  grade: z.string().optional(),
  skills: z.array(SkillSchema).optional(),
  url: z.string().optional(),
});
