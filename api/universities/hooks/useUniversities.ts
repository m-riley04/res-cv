import { queryData } from '@/api/utils/queryData';
import { MessageType } from '@/messaging/enums';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import { University, UniversityIndexableProperty, UniversitySchema } from '..';
import universitiesJson from '../world_universities_and_domains.json';
import { useMessages } from '@/messaging';

export function useUniversities() {
  const messenger = useMessages();

  const universities: University[] = useMemo(() => {
    const result = z.array(UniversitySchema).safeParse(universitiesJson);
    if (result.error) {
      messenger.message(result.error.message, MessageType.Error);
    }
    return result.success ? result.data : [];
  }, [messenger]);

  const queryUniversities = useCallback(
    (
      query: string,
      indexableProperty: UniversityIndexableProperty
    ): University[] => {
      return queryData({
        data: universities,
        query,
        indexableProperty,
      });
    },
    [universities]
  );

  return {
    universities,
    queryUniversities,
  };
}
