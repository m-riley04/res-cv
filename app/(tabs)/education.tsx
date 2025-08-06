import { Education } from '@/api';
import { AddEducationForm, AddModal, ThemedText } from '@/components';
import { useDocument } from '@/contexts';
import { useVisible } from '@/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function EducationScreen() {
  const { t } = useTranslation();
  const { visible, show, hide } = useVisible();
  const { documentData, updateDocument } = useDocument();

  const handleAddEducation = useCallback((education: Education) => {
    console.log('Adding education:', education);
    const updatedEducation = [...(documentData.education || []), education];
    updateDocument({ education: updatedEducation });
  }, []);

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.education')}</ThemedText>
      </View>
      <AddModal
        visible={visible}
        title={t('education.add_education')}
        onAdd={handleAddEducation}
        onClose={hide}
        onRequestClose={hide}
      >
        <AddEducationForm />
      </AddModal>
      <Button onPress={show} title={t('education.add_education')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
