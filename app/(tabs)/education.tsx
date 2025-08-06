import { Education } from '@/api';
import { AddEducationForm, AddModal, ThemedText } from '@/components';
import { useDocument } from '@/contexts';
import { useToggle } from '@uidotdev/usehooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function EducationScreen() {
  const { t } = useTranslation();
  const [isModalVisible, toggleModal] = useToggle();
  const { documentData, updateDocument } = useDocument();

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
        visible={isModalVisible}
        title={t('education.add_education')}
        onAdd={handleAddEducation}
        onClose={() => toggleModal(false)}
        onRequestClose={() => toggleModal(false)}
      >
        <AddEducationForm />
      </AddModal>
      <Button
        onPress={() => toggleModal(true)}
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
