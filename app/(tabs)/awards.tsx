import { Text } from '@/components/common/Text';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function AwardsScreen() {
  const { t } = useTranslation();
  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <Text>{t('tabs.awards')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
