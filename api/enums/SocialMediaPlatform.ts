import { z } from 'zod';

export enum SocialMediaPlatform {
  LinkedIn = 'LinkedIn',
  GitHub = 'GitHub',
  Twitter = 'Twitter',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  YouTube = 'YouTube',
  TikTok = 'TikTok',
}

export const SocialMediaPlatformSchema = z.enum(SocialMediaPlatform);
