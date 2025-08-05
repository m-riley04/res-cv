import { Position } from '@/api';
import { AddModal } from '@/components';
import { ThemedText } from '@/components/common/ThemedText';
import { AddPositionForm } from '@/components/modals/AddPositionForm';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function ExperienceScreen() {
  const { t } = useTranslation();
  const [isAddPositionModalVisible, setAddPositionModalVisible] =
    useState(false);

  const handleOpenAddPositionModal = useCallback(() => {
    setAddPositionModalVisible(true);
  }, []);

  const handleCloseAddPositionModal = useCallback(() => {
    setAddPositionModalVisible(false);
  }, []);

  const handleAddPosition = useCallback((position: Position) => {
    // Logic to handle adding a position
  }, []);

  return (
    <ScrollView>
      <AddModal
        title={t('experience.add_position')}
        visible={isAddPositionModalVisible}
        onClose={handleCloseAddPositionModal}
        onAdd={handleAddPosition}
      >
        <AddPositionForm />
      </AddModal>

      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.experience')}</ThemedText>
      </View>
      <Button
        title={t('experience.add')}
        onPress={handleOpenAddPositionModal}
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
