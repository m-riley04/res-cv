import { z } from 'zod';

export enum EmploymentType {
  FullTime,
  PartTime,
  SelfEmployed,
  Freelance,
  Contract,
  Internship,
  Apprenticeship,
  Seasonal,
}

export const EmploymentTypeSchema = z.enum(EmploymentType);
