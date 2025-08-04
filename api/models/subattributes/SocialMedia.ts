import { SocialMediaPlatform } from '@/api/enums';

export interface SocialMedia {
  id: number;
  username: string;
  platform: SocialMediaPlatform;
  url: string;
}

/**
 * Checks if the provided object is a valid social media entry.
 * @param socialMedia The object to check.
 * @returns True if the object is a valid social media entry, false otherwise.
 */
export function isValidSocialMedia(
  socialMedia: unknown
): socialMedia is SocialMedia {
  if (typeof socialMedia !== 'object' || socialMedia === null) {
    return false;
  }

  const candidate = socialMedia as SocialMedia;

  return (
    typeof candidate.id === 'number' &&
    typeof candidate.username === 'string' &&
    Object.values(SocialMediaPlatform).includes(candidate.platform) &&
    typeof candidate.url === 'string'
  );
}
