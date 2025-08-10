import { useTheme } from '@/theme';
import { FlatList, StyleSheet, View } from 'react-native';
import { ListItem } from '../lists';
import {
  SearchableDropdown,
  SearchableDropdownProps,
} from './SearchableDropdown';

export interface SearchableDropdownListProps<T>
  extends SearchableDropdownProps<T> {
  data: T[];
  keyExtractor: (item: T) => string;
  getLabel: (item: T) => string;
  onPress?: (item: T) => void;
  onPressRemove?: (item: T) => void;
}

export function SearchableDropdownList<T>({
  data,
  getLabel,
  onPressRemove,
  keyExtractor,
  queryFunc,
  onSelect,
  placeholder,
  ...props
}: SearchableDropdownListProps<T>) {
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <FlatList
        data={data}
        style={[styles.itemList, { backgroundColor: theme.darkened }]}
        renderItem={({ item }: { item: T }) => (
          <ListItem<T>
            item={item}
            getLabel={getLabel}
            onPressRemove={onPressRemove}
          />
        )}
        keyExtractor={keyExtractor}
      />
      <SearchableDropdown<T>
        getLabel={getLabel}
        placeholder={placeholder}
        queryFunc={queryFunc}
        onSelect={onSelect}
        clearOnSelection={true}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  itemList: {
    height: 100,
  },
});
