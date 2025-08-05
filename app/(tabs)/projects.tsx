import { Project } from '@/api';
import { AddModal } from '@/components';
import { ThemedText } from '@/components/common/ThemedText';
import { AddProjectForm } from '@/components/modals/AddProjectForm';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function ProjectsScreen() {
  const { t } = useTranslation();
  const [isAddProjectModalVisible, setAddProjectModalVisible] = useState(false);

  const handleOpenAddProjectModal = useCallback(() => {
    setAddProjectModalVisible(true);
  }, []);

  const handleCloseAddProjectModal = useCallback(() => {
    setAddProjectModalVisible(false);
  }, []);

  const handleAddProject = useCallback((project: Project) => {
    // Logic to handle adding a project
  }, []);
  return (
    <ScrollView>
      <AddModal
        title={t('projects.add_project')}
        visible={isAddProjectModalVisible}
        onClose={handleCloseAddProjectModal}
        onAdd={handleAddProject}
      >
        <AddProjectForm />
      </AddModal>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.projects')}</ThemedText>
      </View>
      <Button
        onPress={handleOpenAddProjectModal}
        title={t('projects.add_project')}
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
