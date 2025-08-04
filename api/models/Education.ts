import {
  Activity,
  Degree,
  Institution,
  isValidInstitution,
} from './subattributes';

export interface Education {
  id: number;
  majors?: Degree[];
  minors?: Degree[];
  fieldOfStudy?: string;
  institution: Institution;
  activities?: Activity[];
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

/**
 * Checks if the provided object is a valid education entry.
 * @param education The object to check.
 * @returns True if the object is a valid education entry, false otherwise.
 */
export function isValidEducation(education: unknown): education is Education {
  if (typeof education !== 'object' || education === null) {
    return false;
  }

  const candidate = education as Education;

  // Check required fields
  if (
    !Object.hasOwn(candidate, 'id') ||
    !Object.hasOwn(candidate, 'institution') ||
    !Object.hasOwn(candidate, 'startDate')
  ) {
    return false;
  }

  // Validate institution
  if (!isValidInstitution(candidate.institution)) {
    return false;
  }

  // Validate dates
  if (!(candidate.startDate instanceof Date)) {
    return false;
  }
  if (candidate.endDate && !(candidate.endDate instanceof Date)) {
    return false;
  }

  // Validate degrees
  if (candidate.majors && !Array.isArray(candidate.majors)) {
    return false;
  }
  if (candidate.minors && !Array.isArray(candidate.minors)) {
    return false;
  }

  // Validate activities
  if (candidate.activities && !Array.isArray(candidate.activities)) {
    return false;
  }

  return true;
}
