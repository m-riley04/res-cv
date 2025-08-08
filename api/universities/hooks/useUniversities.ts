import { queryData } from '@/api/utils/queryData';
import { useCallback, useMemo } from 'react';
import z from 'zod';
import { University, UniversityIndexableProperty, UniversitySchema } from '..';
import universitiesJson from '../world_universities_and_domains.json';

export function useUniversities() {
  const universities: University[] = useMemo(() => {
    const result = z.array(UniversitySchema).safeParse(universitiesJson);
    if (result.error) console.error(result.error);
    return result.success ? result.data : [];
  }, []);

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
