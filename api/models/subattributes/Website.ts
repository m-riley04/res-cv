export interface Website {
  id: number;
  url: string;
  label: string;
}
/**
 * Checks if the provided object is a valid website entry.
 * @param website The object to check.
 * @returns True if the object is a valid website entry, false otherwise.
 */
export function isValidWebsite(website: unknown): website is Website {
  if (typeof website !== 'object' || website === null) {
    return false;
  }

  const candidate = website as Website;

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.url === 'string' &&
    typeof candidate.label === 'string'
  );
}
