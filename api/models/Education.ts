import { Skill } from '.';
import { ActivityPosition, SemesterTerm } from '../enums';

export interface Institution {
  name: string;
  location: string; // TODO: use a data type for location?
}

export interface Honor {
  title: string;
  description?: string;
  dateReceived: Date;
}

export interface Degree {
  title: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}

export interface Semester {
  term: SemesterTerm;
  year: Date;
  courses?: Course[];
}

export interface Course {
  title: string;
  code: string;
  description?: string;
  credits?: number;
  grade?: string; // e.g., "A", "B+", etc.
  skills?: Skill[];
  url?: string;
}

export interface Activity {
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  url?: string;
  position?: ActivityPosition;
}

export interface Education {
  id: number;
  majors?: Degree[];
  minors?: Degree[];
  fieldOfStudy?: string;
  institution: Institution;
  activities?: Activity[];
  startDate: Date;
  endDate?: Date;
  gpa?: number;
}
