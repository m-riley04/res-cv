import { SemesterTerm } from '@/api';
import { Course, isValidCourse } from '.';

export interface Semester {
  id: number;
  term: SemesterTerm;
  year: Date;
  courses?: Course[];
}

/**
 * Checks if the provided object is a valid semester.
 * @param obj The object to check.
 * @returns True if the object is a valid semester, false otherwise.
 */
export function isValidSemester(obj: object): obj is Semester {
  const candidate = obj as Semester;
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    typeof candidate.id === 'number' &&
    Object.values(SemesterTerm).includes(candidate.term) &&
    candidate.year instanceof Date &&
    (candidate.courses === undefined ||
      (Array.isArray(candidate.courses) &&
        candidate.courses.every((course) => isValidCourse(course))))
  );
}
