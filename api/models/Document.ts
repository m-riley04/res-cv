import {
  Award,
  ContactInfo,
  Education,
  Language,
  Position,
  Project,
  Skill,
} from '.';

export interface Document {
  id: number;
  contactInfo: ContactInfo;
  projects: Project[];
  skills: Skill[];
  education: Education[];
  languages: Language[];
  experience: Position[];
  awards: Award[];
}
