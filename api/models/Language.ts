import { LanguageProficiency } from '../enums';

export interface Language {
  id: number;
  name: string;
  proficiency: LanguageProficiency;
}
