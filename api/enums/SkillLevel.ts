import { z } from 'zod';

export enum SkillLevel {
  Beginner,
  Intermediate,
  Advanced,
  Expert,
}

export const SkillLevelSchema = z.enum(SkillLevel);
