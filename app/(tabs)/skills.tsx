import { Skill } from '@/api';
import { AddModal } from '@/components';
import { ThemedText } from '@/components/common/ThemedText';
import { useVisible } from '@/hooks';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ScrollView, StyleSheet, View } from 'react-native';

export default function SkillsScreen() {
  const { t } = useTranslation();
  const { visible, show, hide } = useVisible();

  const handleAddSkill = useCallback((_skill: Skill) => {
    // Logic to handle adding a Skill
  }, []);
  return (
    <ScrollView>
      <AddModal
        title={t('skills.add_skill')}
        visible={visible}
        onClose={hide}
        onAdd={handleAddSkill}
      >
        <View></View>
        {/* <AddSkillForm /> */}
      </AddModal>
      <View style={styles.titleContainer}>
        <ThemedText>{t('tabs.skills')}</ThemedText>
      </View>
      <Button onPress={show} title={t('skills.add_skill')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
