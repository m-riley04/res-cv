import { SocialMedia } from '@/api';
import { ThemedText } from '@/components';
import { Link, ExternalPathString } from 'expo-router';

export interface SocialMediaListItemProps {
  socialMedia: SocialMedia;
}

export function SocialMediaListItem({ socialMedia }: SocialMediaListItemProps) {
  return (
    <Link target='_blank' href={socialMedia.url as ExternalPathString}>
      <ThemedText>{`${socialMedia.platform}: ${socialMedia.username}`}</ThemedText>
    </Link>
  );
}
