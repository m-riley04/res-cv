const DEFAULT_CASE_SENSITIVE = false;
const DEFAULT_REVERSE = false;

export interface QueryDataParams<T> {
  data: T[];
  query: string;
  indexableProperty: keyof T;
  reverse?: boolean;
  caseSensitive?: boolean;
}

/**
 * Queries a list of data based on a specific indexable property.
 * @param data The array of data to search within.
 * @param query The query string to search for.
 * @param indexableProperty The property to search within the data object.
 * @param reverse Whether to reverse the filter logic. If true, it will return items that do not match the query.
 * @param caseSensitive Whether the search should be case sensitive. Defaults to false.
 * @returns An array of items that match (or do not match) the query.
 *
 * @template T The type of the items in the data array.
 */
export function queryData<T>({
  data,
  query,
  indexableProperty,
  reverse = DEFAULT_REVERSE,
  caseSensitive = DEFAULT_CASE_SENSITIVE,
}: QueryDataParams<T>): T[] {
  return data.filter((item) => {
    const propertyValue = item[indexableProperty];
    const parsedQuery = caseSensitive ? query : query.toLowerCase();
    const parsedPropValue = caseSensitive
      ? String(propertyValue)
      : String(propertyValue).toLowerCase();
    const value =
      propertyValue !== undefined && propertyValue !== null
        ? parsedPropValue.includes(parsedQuery)
        : false;
    return reverse ? !value : value;
  });
}
