import { Website } from '@/api';
import { ThemedText } from '@/components';
import { Link, ExternalPathString } from 'expo-router';

export interface WebsiteListItemProps {
  website: Website;
}

export function WebsiteListItem({ website }: WebsiteListItemProps) {
  return (
    <Link target='_blank' href={website.url as ExternalPathString}>
      <ThemedText>{website.label}</ThemedText>
    </Link>
  );
}
