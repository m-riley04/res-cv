import { z } from 'zod';

export enum UniversityIndexableProperty {
  Name = 'name',
  Country = 'country',
  StateProvince = 'state-province',
  AlphaTwoCode = 'alpha_two_code',
}

export const UniversityIndexablePropertySchema = z.enum(
  UniversityIndexableProperty
);

export interface University {
  [UniversityIndexableProperty.Name]: string;
  [UniversityIndexableProperty.Country]: string;
  [UniversityIndexableProperty.StateProvince]?: string | null;
  [UniversityIndexableProperty.AlphaTwoCode]: string;
  domains: string[];
  web_pages: string[];
}

export const UniversitySchema = z.object({
  [UniversityIndexableProperty.Name]: z.string(),
  domains: z.array(z.string()),
  web_pages: z.array(z.string()),
  [UniversityIndexableProperty.Country]: z.string(),
  [UniversityIndexableProperty.AlphaTwoCode]: z.string().length(2),
  [UniversityIndexableProperty.StateProvince]: z.string().optional().nullable(),
});
