export interface Award {
  id: number;
  title: string;
  description: string;
  dateReceived: Date;
}

const requiredFields = ['id', 'title', 'description', 'dateReceived'];

export function isValidAward(award: unknown): award is Award {
  if (typeof award !== 'object' || award === null) {
    return false;
  }

  const candidate = award as Award;

  const hasRequiredFields = requiredFields.every((field) => {
    return Object.hasOwn(candidate, field);
  });
  if (!hasRequiredFields) {
    return false;
  }

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.title === 'string' &&
    typeof candidate.description === 'string' &&
    candidate.dateReceived instanceof Date
  );
}
