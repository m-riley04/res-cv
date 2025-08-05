import { Project, Skill } from '@/api';
import { ThemedTextInput } from '@/components';
import { AddModalFormRef } from '@/components/common';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { CrossPlatformDatePicker } from '../common/CrossPlatformDatePicker';

export interface AddProjectFormProps {
  onSubmit?: (project: Project) => void;
}

export const AddProjectForm = forwardRef<
  AddModalFormRef<Project>,
  AddProjectFormProps
>(({}, ref) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [url, setUrl] = useState('');
  const [skills, setSkills] = useState<Skill[]>([]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (
        !title.trim() ||
        !description.trim() ||
        !startDate ||
        !endDate ||
        skills.length === 0
      ) {
        return null;
      }
      return {
        id: Date.now(), // TODO: generate ID differently, likely will come from backend
        title: title.trim(),
        startDate,
        endDate,
        description: description.trim(),
        skills,
      };
    },
    isValid: () => {
      return (
        title.trim().length > 0 &&
        description.trim().length > 0 &&
        startDate !== undefined &&
        endDate !== undefined &&
        skills.length > 0
      );
    },
  }));

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('projects.title_placeholder')}
        value={title}
        onChangeText={setTitle}
      />
      <ThemedTextInput
        inputMode='text'
        placeholder={t('projects.description_placeholder')}
        value={description}
        onChangeText={setDescription}
      />
      <CrossPlatformDatePicker
        value={startDate ?? new Date()}
        onChange={setStartDate}
      />
      <CrossPlatformDatePicker
        value={endDate ?? new Date()}
        onChange={setEndDate}
      />
      <ThemedTextInput
        inputMode='text'
        placeholder={t('projects.url_placeholder')}
        value={url}
        onChangeText={setUrl}
      />

      {/* <ThemedTextInput
        inputMode='text' // TODO: make this it's own component that allows adding multiple skills/tags
        placeholder={t('position.skills_placeholder')}
        value={skills.join(', ')}
        onChangeText={(text) =>
          setSkills(text.split(',').map((skill) => skill.trim()))
        }
      /> */}
    </ScrollView>
  );
});

AddProjectForm.displayName = 'AddProjectForm';
