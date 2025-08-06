import { University, UniversitySchema } from '../universities';
import {
  Activity,
  ActivitySchema,
  Degree,
  DegreeSchema,
} from './subattributes';

import { z } from 'zod';

export interface Education {
  id: number;
  majors?: Degree[];
  minors?: Degree[];
  fieldOfStudy?: string;
  university: University;
  activities?: Activity[];
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export const EducationSchema = z.object({
  id: z.number(),
  majors: z.array(DegreeSchema).optional(),
  minors: z.array(DegreeSchema).optional(),
  fieldOfStudy: z.string().optional(),
  university: UniversitySchema,
  activities: z.array(ActivitySchema).optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
  gpa: z.number().min(0).max(6).optional(),
});
