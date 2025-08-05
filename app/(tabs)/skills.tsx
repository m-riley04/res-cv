import { Skill } from '@/api';
import { AddModal } from '@/components';
import { ThemedText } from '@/components/common/ThemedText';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function SkillsScreen() {
  const { t } = useTranslation();
  const [isAddSkillModalVisible, setAddSkillModalVisible] = useState(false);

  const handleOpenAddSkillModal = useCallback(() => {
    setAddSkillModalVisible(true);
  }, []);

  const handleCloseAddSkillModal = useCallback(() => {
    setAddSkillModalVisible(false);
  }, []);

  const handleAddSkill = useCallback((skill: Skill) => {
    // Logic to handle adding a Skill
  }, []);
  return (
    <ScrollView>
      <AddModal
        title={t('skills.add_skill')}
        visible={isAddSkillModalVisible}
        onClose={handleCloseAddSkillModal}
        onAdd={handleAddSkill}
      >
        <View></View>
        {/* <AddSkillForm /> */}
      </AddModal>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.skills')}</ThemedText>
      </View>
      <Button onPress={handleOpenAddSkillModal} title={t('skills.add_skill')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
