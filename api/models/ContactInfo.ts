import { SocialMediaPlatform } from '../enums';

export interface Website {
  id: number;
  url: string;
  label: string;
}

export interface SocialMedia {
  id: number;
  username: string;
  platform: SocialMediaPlatform;
  url: string;
}

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
