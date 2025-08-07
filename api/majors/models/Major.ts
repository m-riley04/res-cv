import { z } from 'zod';

export enum MajorIndexableProperty {
  RowId = 'rowid',
  FOD1P = 'FOD1P',
  MajorName = 'Major_Name',
  MajorCategory = 'Major_Category',
}

export interface Major {
  [MajorIndexableProperty.RowId]: number;
  [MajorIndexableProperty.FOD1P]: string;
  [MajorIndexableProperty.MajorName]: string;
  [MajorIndexableProperty.MajorCategory]: string;
}

export const MajorSchema = z.object({
  [MajorIndexableProperty.RowId]: z.number(),
  [MajorIndexableProperty.FOD1P]: z.string(),
  [MajorIndexableProperty.MajorName]: z.string(),
  [MajorIndexableProperty.MajorCategory]: z.string(),
});
