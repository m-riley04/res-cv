export interface Honor {
  id: number;
  title: string;
  description?: string;
  dateReceived: Date;
}

/**
 * Checks if the provided object is a valid honor.
 * @param obj The object to check.
 * @returns True if the object is a valid honor, false otherwise.
 */
export function isValidHonor(obj: object): obj is Honor {
  const candidate = obj as Honor;
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string' &&
    (candidate.description === undefined ||
      typeof candidate.description === 'string') &&
    candidate.dateReceived instanceof Date
  );
}
