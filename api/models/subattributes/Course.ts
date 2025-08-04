import { Skill } from '..';

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

export function isValidCourse(course: unknown): course is Course {
  if (typeof course !== 'object' || course === null) {
    return false;
  }

  const candidate = course as Course;

  const hasRequiredFields = ['id', 'title', 'code'].every((field) => {
    return Object.hasOwn(candidate, field);
  });
  if (!hasRequiredFields) {
    return false;
  }

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string' &&
    typeof candidate.code === 'string' &&
    Array.isArray(candidate.skills) &&
    candidate.skills.every(
      (skill) => typeof skill === 'object' && 'id' in skill && 'name' in skill
    )
  );
}
