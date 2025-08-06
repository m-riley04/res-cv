import { useVisible } from '@/hooks';
import { useClickAway } from '@uidotdev/usehooks';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedTextInput } from './ThemedTextInput';

export interface SearchableDropdownItem {
  label: string;
}

export interface SearchableDropdownProps<T extends SearchableDropdownItem> {
  queryFunc: (query: string) => T[];
  onSelect: (item: T) => void;
}

export function SearchableDropdown<T extends SearchableDropdownItem>({
  queryFunc,
  onSelect,
}: SearchableDropdownProps<T>) {
  const { t } = useTranslation();
  const {
    visible: isListVisible,
    show: showList,
    hide: hideList,
    toggle: toggleList,
  } = useVisible();
  const [searchQuery, setSearchQuery] = useState('');

  const ref = useClickAway(() => {
    hideList();
  });

  const queriedItems = useMemo(() => {
    return queryFunc(searchQuery);
  }, [searchQuery, queryFunc]);

  const handleQueryChange = useCallback(
    (text: string) => {
      setSearchQuery(text);
    },
    [setSearchQuery]
  );

  const handleSelectItem = useCallback(
    (item: T) => {
      onSelect(item);
      hideList();
    },
    [onSelect, hideList]
  );

  const handleChange = useCallback(() => {
    toggleList(searchQuery.length > 0);
  }, [isListVisible, searchQuery, toggleList]);

  return (
    <>
      <ThemedTextInput
        onChangeText={handleQueryChange}
        onEndEditing={hideList}
        onChange={handleChange}
        onFocus={handleChange}
        onSubmitEditing={hideList}
        placeholder={t('university.search')}
      />
      {isListVisible ? (
        <FlatList
          style={styles.list}
          data={queriedItems}
          renderItem={({ item }: { item: T }) => (
            <Pressable onPress={() => handleSelectItem(item)}>
              <ThemedText>{item.label}</ThemedText>
            </Pressable>
          )}
        />
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    maxHeight: 200,
  },
});
