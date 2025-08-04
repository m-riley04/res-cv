import { SocialMedia, Website } from './subattributes';

export interface ContactInfo {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  address?: string;
  websites?: Website[];
  socialMedia?: SocialMedia[];
}

/**
 * Determines if the provided object is a valid contact information structure.
 * @param contactInfo The object to check.
 * @returns True if the object is a valid contact information structure, false otherwise.
 */
export function isValidContactInfo(
  contactInfo: unknown
): contactInfo is ContactInfo {
  if (typeof contactInfo !== 'object' || contactInfo === null) {
    return false;
  }

  const candidate = contactInfo as ContactInfo;

  // TODO: Add more specific validation for each field if necessary (all are optional right now)
  return true;
}
