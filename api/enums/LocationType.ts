import { z } from 'zod';

export enum LocationType {
  OnSite,
  Hybrid,
  Remote,
}

export const LocationTypeSchema = z.enum(LocationType);
