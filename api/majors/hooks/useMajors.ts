import { queryData } from '@/api/utils/queryData';
import { useCallback, useMemo } from 'react';
import { z } from 'zod';
import majorsJson from '../majors.json';
import { Major, MajorIndexableProperty, MajorSchema } from '../models';

export function useMajors() {
  const majors: Major[] = useMemo(() => {
    const result = z.array(MajorSchema).safeParse(majorsJson);
    if (result.error) console.error(result.error);
    return result.success ? result.data : [];
  }, []);

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

  return {
    majors,
    queryMajors,
  };
}
