import { z } from 'zod';
import majorsJson from '../majors.json';
import { MajorSchema } from '../models';

export function useMajors() {
  const majors = z.array(MajorSchema).safeParse(majorsJson);

  return {
    majors,
  };
}
