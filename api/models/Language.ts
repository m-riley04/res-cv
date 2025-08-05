import { LanguageProficiency, LanguageProficiencySchema } from '../enums';

export interface Language {
  id: number;
  name: string;
  proficiency: LanguageProficiency;
}

import { z } from 'zod';
export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  proficiency: LanguageProficiencySchema,
});
