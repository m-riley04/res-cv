import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.home')}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
