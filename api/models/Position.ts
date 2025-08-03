import { Skill } from '.';
import { EmploymentType, LocationType } from '../enums';

export interface Company {
  name: string;
  website?: string;
}

export interface Position {
  id: number;
  jobTitle: string;
  employmentType: EmploymentType;
  company: Company;
  location: string; // TODO: use a data type for location?
  locationType: LocationType;
  startDate: Date;
  endDate?: Date;
  description: string;
  skills: Skill[];
}
