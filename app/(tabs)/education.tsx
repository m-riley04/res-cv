import { Education } from '@/api';
import { AddEducationForm, AddModal, ThemedText } from '@/components';
import { useDocument } from '@/contexts';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function EducationScreen() {
  const { t } = useTranslation();
  const [isEducationModalVisible, setEducationModalVisible] = useState(false);
  const { documentData, updateDocument } = useDocument();

  const handleOpenAddEducation = useCallback(() => {
    setEducationModalVisible(true);
  }, []);

  const handleCloseEducationModal = useCallback(() => {
    setEducationModalVisible(false);
  }, []);

  const handleAddEducation = useCallback((education: Education) => {
    const updatedEducation = [...(documentData.education || []), education];
    updateDocument({ education: updatedEducation });
  }, []);

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.education')}</ThemedText>
      </View>
      <AddModal
        onRequestClose={handleCloseEducationModal}
        visible={isEducationModalVisible}
        title={t('education.add_education')}
        onAdd={handleAddEducation}
        onClose={handleCloseEducationModal}
      >
        <AddEducationForm />
      </AddModal>
      <Button
        onPress={handleOpenAddEducation}
        title={t('education.add_education')}
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
