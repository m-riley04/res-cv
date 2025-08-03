import { Skill } from '.';

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  skills: Skill[];
}
