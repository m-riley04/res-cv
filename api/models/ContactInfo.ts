import { z } from 'zod';
import {
  SocialMedia,
  SocialMediaSchema,
  Website,
  WebsiteSchema,
} from './subattributes';

export interface ContactInfo {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  phone?: string;
  address?: string;
  websites?: Website[];
  socialMedia?: SocialMedia[];
}

export const ContactInfoSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  websites: z.array(WebsiteSchema).optional(),
  socialMedia: z.array(SocialMediaSchema).optional(),
});
