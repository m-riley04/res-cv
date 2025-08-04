import {
  Award,
  ContactInfo,
  Education,
  isValidAward,
  isValidContactInfo,
  isValidEducation,
  isValidLanguage,
  isValidPosition,
  isValidProject,
  isValidSkill,
  Language,
  Position,
  Project,
  Skill,
} from '.';

export interface CvDocument {
  id: number;
  contactInfo: ContactInfo;
  projects: Project[];
  skills: Skill[];
  education: Education[];
  languages: Language[];
  experience: Position[];
  awards: Award[];
}

const requiredFields = [
  'id',
  'contactInfo',
  'projects',
  'skills',
  'education',
  'languages',
  'experience',
  'awards',
];

/**
 * Determines if the provided object is a valid CV document (only on the top-level).
 * @param doc The object to check.
 * @returns True if the object is a valid CV document, false otherwise.
 */
export function isBasicCvDocument(doc: unknown): doc is CvDocument {
  if (typeof doc !== 'object' || doc === null) {
    return false;
  }

  const candidate = doc as CvDocument;
  const hasAllRequiredFields = requiredFields.every((field) => {
    return Object.hasOwn(doc, field);
  });

  // Check required properties exist and have correct types
  return (
    hasAllRequiredFields &&
    typeof candidate.id === 'number' &&
    typeof candidate.contactInfo === 'object' &&
    candidate.contactInfo !== null &&
    Array.isArray(candidate.projects) &&
    Array.isArray(candidate.skills) &&
    Array.isArray(candidate.education) &&
    Array.isArray(candidate.languages) &&
    Array.isArray(candidate.experience) &&
    Array.isArray(candidate.awards)
  );
}

/**
 * Validates a CV document more thoroughly, checking nested object structures.
 * @param doc The document to validate.
 * @returns True if the document is valid and well-formed, false otherwise.
 */
export function isValidCvDocument(doc: unknown): doc is CvDocument {
  if (!isBasicCvDocument(doc)) {
    return false;
  }

  // Additional validation for contactInfo structure
  const contactInfo = doc.contactInfo as ContactInfo;
  const projects = doc.projects as Project[];
  const skills = doc.skills as Skill[];
  const education = doc.education as Education[];
  const languages = doc.languages as Language[];
  const experience = doc.experience as Position[];
  const awards = doc.awards as Award[];

  return (
    isValidContactInfo(contactInfo) &&
    projects.every(isValidProject) &&
    skills.every(isValidSkill) &&
    education.every(isValidEducation) &&
    languages.every(isValidLanguage) &&
    experience.every(isValidPosition) &&
    awards.every(isValidAward)
  );
}
