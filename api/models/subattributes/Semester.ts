import { SemesterTerm, SemesterTermSchema } from '@/api';
import { z } from 'zod';
import { Course, CourseSchema } from '.';

export interface Semester {
  id: number;
  term: SemesterTerm;
  year: Date;
  courses?: Course[];
}

export const SemesterSchema = z.object({
  id: z.number(),
  term: SemesterTermSchema,
  year: z.date(),
  courses: z.array(CourseSchema).optional(),
});
