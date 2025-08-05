import { SocialMediaPlatform, SocialMediaPlatformSchema } from '@/api/enums';
import { z } from 'zod';

export interface SocialMedia {
  id: number;
  username: string;
  platform: SocialMediaPlatform;
  url: string;
}

export const SocialMediaSchema = z.object({
  id: z.number(),
  username: z.string(),
  platform: SocialMediaPlatformSchema,
  url: z.string(),
});
