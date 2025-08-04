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

const requiredProperties = [
  'id',
  'title',
  'description',
  'startDate',
  'skills',
];

/**
 * Checks if the provided object is a valid Project.
 * @param project The object to check.
 * @returns True if the object is a valid Project, false otherwise.
 */
export function isValidProject(project: unknown): project is Project {
  if (typeof project !== 'object' || project === null) {
    return false;
  }

  const candidate = project as Project;

  requiredProperties.forEach((prop) => {
    if (!Object.hasOwn(candidate, prop)) {
      console.error(`Property "${prop}" is missing in project`);
      return false;
    }
  });

  return true;
}
