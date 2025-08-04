import { LanguageProficiency } from '../enums';

export interface Language {
  id: number;
  name: string;
  proficiency: LanguageProficiency;
}

const requiredFields = ['id', 'name', 'proficiency'];

export function isValidLanguage(language: unknown): language is Language {
  if (typeof language !== 'object' || language === null) {
    return false;
  }

  const candidate = language as Language;

  const hasRequiredFields = requiredFields.every((field) => {
    return Object.hasOwn(candidate, field);
  });
  if (!hasRequiredFields) {
    return false;
  }

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.name === 'string' &&
    Object.values(LanguageProficiency).includes(candidate.proficiency)
  );
}
