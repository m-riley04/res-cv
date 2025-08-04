export interface Company {
  name: string;
  website?: string;
}

/**
 * Checks if the provided object is a valid company entry.
 * @param company The object to check.
 * @returns True if the object is a valid company entry, false otherwise.
 */
export function isValidCompany(company: unknown): company is Company {
  if (typeof company !== 'object' || company === null) {
    return false;
  }

  const candidate = company as Company;

  return (
    typeof candidate.name === 'string' &&
    (candidate.website === undefined || typeof candidate.website === 'string')
  );
}
