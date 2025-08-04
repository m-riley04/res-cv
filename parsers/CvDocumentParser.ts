import { CvDocument, isValidCvDocument } from '@/api';

/**
 * Parses CV documents.
 */
export class CvDocumentParser {
  /**
   * Safely parses a string as a CV document.
   * @param data The data to parse.
   * @returns The parsed document or null if invalid.
   */
  public static safeParse(data: string): CvDocument | null {
    try {
      const parsedData = JSON.parse(data);
      if (!isValidCvDocument(parsedData)) {
        return null;
      }
      return parsedData;
    } catch {
      return null;
    }
  }

  /**
   * Validates a CV document and returns detailed error information.
   * @param doc The document to validate.
   * @returns An object containing validation result and error messages.
   */
  public static validateWithErrors(doc: unknown): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (typeof doc !== 'object' || doc === null) {
      errors.push('Document must be a non-null object');
      return { isValid: false, errors };
    }

    const candidate = doc as Record<string, unknown>;

    // Check each required property
    if (typeof candidate.id !== 'number') {
      errors.push('Property "id" must be a number');
    }

    if (
      typeof candidate.contactInfo !== 'object' ||
      candidate.contactInfo === null
    ) {
      errors.push('Property "contactInfo" must be a non-null object');
    }

    const arrayFields = [
      'projects',
      'skills',
      'education',
      'languages',
      'experience',
      'awards',
    ];
    arrayFields.forEach((field) => {
      if (!Array.isArray(candidate[field])) {
        errors.push(`Property "${field}" must be an array`);
      }
    });

    return { isValid: errors.length === 0, errors };
  }
}
