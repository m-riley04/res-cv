import { ActivityPosition } from '@/api/enums';

export interface Activity {
  id: number;
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  position?: ActivityPosition;
}

/**
 * Checks if the provided object is a valid activity.
 * @param obj The object to check.
 * @returns True if the object is a valid activity, false otherwise.
 */
export function isValidActivity(obj: object): obj is Activity {
  const requiredFields = ['id', 'title', 'startDate'];
  const candidate = obj as Activity;
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    requiredFields.every((field) => Object.hasOwn(candidate, field)) &&
    typeof candidate.title === 'string' &&
    typeof candidate.id === 'number' &&
    candidate.startDate instanceof Date &&
    (candidate.endDate === undefined || candidate.endDate instanceof Date)
  );
}
