import { Major, MajorSchema } from '../majors/models';
import { University, UniversitySchema } from '../universities';
import { Activity, ActivitySchema } from './subattributes';

import { z } from 'zod';

export interface Education {
  id: number;
  majors?: Major[];
  minors?: Major[];
  fieldOfStudy?: string;
  university: University;
  activities?: Activity[];
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export const EducationSchema = z.object({
  id: z.number(),
  majors: z.array(MajorSchema).optional(),
  minors: z.array(MajorSchema).optional(),
  fieldOfStudy: z.string().optional(),
  university: UniversitySchema,
  activities: z.array(ActivitySchema).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  gpa: z.number().min(0).max(6).optional(),
});
