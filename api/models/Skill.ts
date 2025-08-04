export interface Skill {
  id: number;
  name: string;
}

const requiredFields = ['id', 'name'];

export function isValidSkill(skill: unknown): skill is Skill {
  if (typeof skill !== 'object' || skill === null) {
    return false;
  }

  const candidate = skill as Skill;

  const hasRequiredFields = requiredFields.every((field) => {
    return Object.hasOwn(candidate, field);
  });
  if (!hasRequiredFields) {
    return false;
  }

  return typeof candidate.id === 'number' && typeof candidate.name === 'string';
}
