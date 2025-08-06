import { Award } from '@/api';
import { AddModal } from '@/components';
import { ThemedText } from '@/components/common/ThemedText';
import { useToggle } from '@uidotdev/usehooks';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function AwardsScreen() {
  const { t } = useTranslation();
  const [isAddAwardVisible, toggleAddAwardVisible] = useToggle(false);

  const handleAddAward = useCallback((award: Award) => {
    // Logic to handle adding a Award
  }, []);
  return (
    <ScrollView>
      <AddModal
        title={t('awards.add_award')}
        visible={isAddAwardVisible}
        onClose={() => toggleAddAwardVisible(false)}
        onAdd={handleAddAward}
      >
        <View></View>
        {/* <AddAwardForm /> */}
      </AddModal>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.awards')}</ThemedText>
      </View>
      <Button
        onPress={() => toggleAddAwardVisible(true)}
        title={t('awards.add_award')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
