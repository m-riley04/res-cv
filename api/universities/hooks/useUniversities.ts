import { useCallback, useMemo } from 'react';
import { University, UniversityIndexableProperty } from '..';
import universitiesJson from '../world_universities_and_domains.json';

export function useUniversities() {
  const universities = useMemo(() => universitiesJson as University[], []);

  /**
   * Queries the list of universities based on a specific indexable property.
   * @param query The query string to search for.
   * @param indexableProperty The property to search within the university object.
   * @param reverse Whether to reverse the filter logic. If true, it will return universities that do not match the query.
   * @returns An array of universities that match (or do not match) the query.
   */
  const queryUniversities = useCallback(
    (
      query: string,
      indexableProperty: UniversityIndexableProperty,
      reverse: boolean = false
    ): University[] => {
      return universities.filter((university) => {
        const value = university[indexableProperty]?.includes(query);
        return reverse ? !value : value;
      });
    },
    []
  );

  return {
    universities,
    queryUniversities,
  };
}
