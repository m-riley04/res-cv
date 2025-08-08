import { useVisible } from '@/hooks';
import { useTheme } from '@/theme';
import { useClickAway, useMeasure } from '@uidotdev/usehooks';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedTextInput } from './ThemedTextInput';

/**
 * The base dropdown item interface that all items must extend.
 */
export interface SearchableDropdownItem {
  label: string;
}

/**
 * Props for the searchable dropdown component.
 * @param queryFunc The function to query itmes on based on the search string.
 * @param onSelect The function to call when an item is selected.
 * @template T The type of the dropdown item. Must extend the base SearchableDropdownItem.
 */
export interface SearchableDropdownProps<T extends SearchableDropdownItem> {
  queryFunc: (query: string) => T[];
  placeholder?: string;
  onSelect: (item: T) => void;
}

/**
 * A dropdown component that allows users to search and select an item from a list.
 * @returns
 */
export function SearchableDropdown<T extends SearchableDropdownItem>({
  queryFunc,
  onSelect,
  placeholder,
}: SearchableDropdownProps<T>) {
  const { t } = useTranslation();
  const {
    visible: isListVisible,
    show: showList,
    hide: hideList,
    toggle: toggleList,
  } = useVisible();
  const [searchQuery, setSearchQuery] = useState('');

  const [ref, { height: inputHeight }] = useMeasure();

  const refClickAway = useClickAway(() => {
    hideList();
  });

  const theme = useTheme();

  const queriedItems = useMemo(() => {
    return queryFunc(searchQuery);
  }, [searchQuery, queryFunc]);

  const handleQueryChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
      toggleList(text.length > 0);
    },
    [setSearchQuery, toggleList]
  );

  const handleSelectItem = useCallback(
    (item: T) => {
      onSelect(item);
      setSearchQuery(item.label);
      hideList();
    },
    [onSelect, hideList]
  );

  const handleOnFocus = useCallback(() => {
    toggleList(searchQuery.length > 0);
  }, [isListVisible, searchQuery, toggleList]);

  return (
    <View ref={ref as any}>
      <View ref={refClickAway as any}>
        <ThemedTextInput
          onChangeText={handleQueryChange}
          onEndEditing={hideList}
          onFocus={handleOnFocus}
          onSubmitEditing={hideList}
          value={searchQuery}
          placeholder={placeholder ?? t('search')}
        />

        {isListVisible ? (
          <FlatList
            style={[
              styles.list,
              {
                backgroundColor: theme.listBackground,
                top: inputHeight,
              },
            ]}
            data={queriedItems}
            renderItem={({ item }: { item: T }) => (
              <Pressable onPress={() => handleSelectItem(item)}>
                <ThemedText>{item.label}</ThemedText>
              </Pressable>
            )}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
  },
  list: {
    width: '100%',
    maxHeight: 200,
    position: 'absolute',
    zIndex: 999,
  },
});
