import { z } from 'zod';

export enum ActivityPosition {
  Other,
  Leader,
  Member,
  Observer,
  Contributor,
}

export const ActivityPositionSchema = z.enum(ActivityPosition);
