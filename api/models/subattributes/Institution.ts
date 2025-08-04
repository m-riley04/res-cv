export interface Institution {
  id: number;
  name: string;
  location: string; // TODO: use a data type for location?
}

/**
 * Checks if the provided object is a valid educational institution.
 * @param obj The object to check.
 * @returns True if the object is a valid institution, false otherwise.
 */
export function isValidInstitution(obj: object): obj is Institution {
  const candidate = obj as Institution;
  return (
    typeof candidate === 'object' &&
    candidate !== null &&
    typeof candidate.name === 'string' &&
    typeof candidate.location === 'string'
  );
}
