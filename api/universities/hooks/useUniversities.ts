import { University } from '..';
import universitiesJson from '../world_universities_and_domains.json';

export enum UniversityFilter {
  Name = 'name',
  Country = 'country',
  StateProvince = 'state-province',
  AlphaTwoCode = 'alpha_two_code',
}

export function useUniversities() {
  const universities = universitiesJson as University[];

  /**
   * Filters the list of universities based on the provided filters.
   * @param filters An array of filters to apply.
   * @returns An array of filtered universities.
   */
  const filterUniversities = (filters: UniversityFilter[]): University[] => {
    return universities.filter((university) => {
      return filters.every((filter) => {
        switch (filter) {
          case UniversityFilter.Name:
            return university.name
              .toLowerCase()
              .includes(filter.valueOf().toLowerCase());
          case UniversityFilter.Country:
            return university.country
              .toLowerCase()
              .includes(filter.valueOf().toLowerCase());
          case UniversityFilter.StateProvince:
            return university['state-province']
              ?.toLowerCase()
              .includes(filter.valueOf().toLowerCase());
          case UniversityFilter.AlphaTwoCode:
            return university.alpha_two_code
              .toLowerCase()
              .includes(filter.valueOf().toLowerCase());
          default:
            return true;
        }
      });
    });
  };

  return {
    universities,
  };
}
