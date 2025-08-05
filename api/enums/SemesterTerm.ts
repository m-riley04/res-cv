import { z } from 'zod';

export enum SemesterTerm {
  Spring = 'spring',
  Summer = 'summer',
  Fall = 'fall',
  Winter = 'winter',
}

export const SemesterTermSchema = z.enum(SemesterTerm);
