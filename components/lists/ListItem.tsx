import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedButton, ThemedText } from '../common';

export interface ListItemProps<T> {
  item: T;
  getLabel: (item: T) => string;
  onPress?: (item: T) => void;
  onPressRemove?: (item: T) => void;
}

export function ListItem<T>({
  item,
  getLabel,
  onPress,
  onPressRemove,
}: ListItemProps<T>) {
  const _theme = useTheme();
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => onPress?.(item)}
    >
      <ThemedText style={styles.label}>{getLabel(item)}</ThemedText>
      {onPressRemove ? (
        <ThemedButton
          onPress={() => onPressRemove(item)}
          title={t('common.remove')}
          style={styles.removeButton}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    flex: 2,
  },
  removeButton: {
    flex: 1,
  },
});
