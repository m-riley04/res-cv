export interface Degree {
  id: number;
  title: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

/**
 * Checks if the provided object is a valid degree.
 * @param degree The object to check.
 * @returns True if the object is a valid degree, false otherwise.
 */
export function isValidDegree(degree: unknown): degree is Degree {
  if (typeof degree !== 'object' || degree === null) {
    return false;
  }

  const candidate = degree as Degree;

  // Check required fields
  if (
    !Object.hasOwn(candidate, 'id') ||
    !Object.hasOwn(candidate, 'title') ||
    !Object.hasOwn(candidate, 'startDate')
  ) {
    return false;
  }

  // Validate dates
  if (!(candidate.startDate instanceof Date)) {
    return false;
  }
  if (candidate.endDate && !(candidate.endDate instanceof Date)) {
    return false;
  }

  // Validate GPA
  if (candidate.gpa !== undefined && typeof candidate.gpa !== 'number') {
    return false;
  }

  return true;
}
