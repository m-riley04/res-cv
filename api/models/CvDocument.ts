import { z } from 'zod';
import {
  Award,
  AwardSchema,
  ContactInfo,
  ContactInfoSchema,
  Education,
  EducationSchema,
  Language,
  LanguageSchema,
  Position,
  PositionSchema,
  Project,
  ProjectSchema,
  Skill,
  SkillSchema,
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

export const CvDocumentSchema = z.object({
  id: z.number(),
  contactInfo: ContactInfoSchema,
  projects: z.array(ProjectSchema),
  skills: z.array(SkillSchema),
  education: z.array(EducationSchema),
  languages: z.array(LanguageSchema),
  experience: z.array(PositionSchema),
  awards: z.array(AwardSchema),
});
