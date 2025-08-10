import { queryData } from '@/api/utils/queryData';
import { useMessages } from '@/messaging';
import { MessageType } from '@/messaging/enums';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import majorsJson from '../majors.json';
import { Major, MajorIndexableProperty, MajorSchema } from '../models';

export function useMajors() {
  const messenger = useMessages();

  const majors: Major[] = useMemo(() => {
    const result = z.array(MajorSchema).safeParse(majorsJson);
    if (result.error) {
      messenger.message(result.error.message, MessageType.Error);
    }
    return result.success ? result.data : [];
  }, [messenger]);

  const queryMajors = useCallback(
    (query: string, indexableProperty: MajorIndexableProperty): Major[] => {
      return queryData({
        data: majors,
        query,
        indexableProperty,
      });
    },
    [majors]
  );

  const getKey = useCallback((major: Major) => {
    return major[MajorIndexableProperty.RowId].toString();
  }, []);

  const getLabel = useCallback((major: Major) => {
    return major[MajorIndexableProperty.MajorName];
  }, []);

  return {
    majors,
    queryMajors,
    getKey,
    getLabel,
  };
}
