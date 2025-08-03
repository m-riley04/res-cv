import { SocialMediaPlatform } from '../enums';

export interface Website {
  url: string;
  label: string;
}

export interface SocialMedia {
  username: string;
  platform: SocialMediaPlatform;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  websites?: Website[];
  socialMedia?: SocialMedia[];
}
