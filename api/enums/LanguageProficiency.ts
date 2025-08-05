import { z } from 'zod';

export enum LanguageProficiency {
  Beginner,
  Intermediate,
  Advanced,
  Native,
}

export const LanguageProficiencySchema = z.enum(LanguageProficiency);
