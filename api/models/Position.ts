import { Skill } from '.';
import { EmploymentType, LocationType } from '../enums';
import { Company } from './subattributes';

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

const requiredFields = [
  'id',
  'jobTitle',
  'employmentType',
  'company',
  'location',
  'locationType',
  'startDate',
  'description',
  'skills',
];

/**
 * Checks if the provided object is a valid position entry.
 * @param position The object to check.
 * @returns True if the object is a valid position entry, false otherwise.
 */
export function isValidPosition(position: unknown): position is Position {
  if (typeof position !== 'object' || position === null) {
    return false;
  }

  const candidate = position as Position;

  const hasRequiredFields = requiredFields.every((field) => {
    return Object.hasOwn(candidate, field);
  });
  if (!hasRequiredFields) {
    return false;
  }

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.jobTitle === 'string' &&
    Object.values(EmploymentType).includes(candidate.employmentType) &&
    typeof candidate.company === 'object' &&
    typeof candidate.location === 'string' &&
    Object.values(LocationType).includes(candidate.locationType) &&
    candidate.startDate instanceof Date &&
    (candidate.endDate === undefined || candidate.endDate instanceof Date) &&
    typeof candidate.description === 'string' &&
    Array.isArray(candidate.skills) &&
    candidate.skills.every(
      (skill) => typeof skill === 'object' && 'id' in skill && 'name' in skill
    )
  );
}
