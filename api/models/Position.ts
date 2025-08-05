import { Skill, SkillSchema } from '.';
import {
  EmploymentType,
  EmploymentTypeSchema,
  LocationType,
  LocationTypeSchema,
} from '../enums';
import { Company, CompanySchema } from './subattributes';

export interface Position {
  id: number;
  jobTitle: string;
  employmentType: EmploymentType;
  company: Company;
  location: string; // TODO: use a data type for location?
  locationType: LocationType;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: Skill[];
}

import { z } from 'zod';
export const PositionSchema = z.object({
  id: z.number(),
  jobTitle: z.string(),
  employmentType: EmploymentTypeSchema,
  company: CompanySchema,
  location: z.string(),
  locationType: LocationTypeSchema,
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.string(),
  skills: z.array(SkillSchema),
});
