import { Company, EmploymentType, LocationType, Position } from '@/api';
import { ThemedTextInput } from '@/components';
import { AddModalFormRef, ThemedPicker } from '@/components/common';
import { Picker } from '@react-native-picker/picker';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';
import { CrossPlatformDatePicker } from '../common/CrossPlatformDatePicker';

export interface AddPositionFormProps {
  onSubmit?: (position: Position) => void;
}

export const AddPositionForm = forwardRef<
  AddModalFormRef<Position>,
  AddPositionFormProps
>(({}, ref) => {
  const { t } = useTranslation();
  const [jobTitle, setJobTitle] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>();
  const [company, setCompany] = useState<Company>();
  const [location, setLocation] = useState('');
  const [locationType, setLocationType] = useState<LocationType>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (
        !jobTitle.trim() ||
        !employmentType ||
        !company ||
        !location.trim() ||
        !locationType ||
        !startDate ||
        !endDate ||
        !description.trim() ||
        skills.length === 0
      ) {
        return null;
      }
      return {
        id: Date.now(), // TODO: generate ID differently, likely will come from backend
        jobTitle: jobTitle.trim(),
        employmentType,
        company,
        location: location.trim(),
        locationType,
        startDate,
        endDate,
        description: description.trim(),
        skills: skills.map((skill, idx) => ({
          id: Date.now() + idx, // Temporary unique ID for each skill
          name: skill,
        })), // Convert string[] to Skill[]
      };
    },
    isValid: () => {
      return (
        jobTitle.trim().length > 0 &&
        employmentType !== undefined &&
        company !== undefined &&
        location.trim().length > 0 &&
        locationType !== undefined &&
        startDate !== undefined &&
        endDate !== undefined &&
        description.trim().length > 0 &&
        skills.length > 0
      );
    },
  }));

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('position.job_title_placeholder')}
        value={jobTitle}
        onChangeText={setJobTitle}
      />
      <ThemedPicker
        placeholder={t('position.employment_type_placeholder')}
        selectedValue={employmentType}
        onValueChange={(value) => setEmploymentType(value as EmploymentType)}
      >
        <Picker.Item
          label={t('position.employment_type_full_time')}
          value={EmploymentType.FullTime}
        />
        <Picker.Item
          label={t('position.employment_type_part_time')}
          value={EmploymentType.PartTime}
        />
        <Picker.Item
          label={t('position.employment_type_contractor')}
          value={EmploymentType.Contract}
        />
        <Picker.Item
          label={t('position.employment_type_internship')}
          value={EmploymentType.Internship}
        />
        <Picker.Item
          label={t('position.employment_type_seasonal')}
          value={EmploymentType.Seasonal}
        />
        <Picker.Item
          label={t('position.employment_type_self_employed')}
          value={EmploymentType.SelfEmployed}
        />
        <Picker.Item
          label={t('position.employment_type_apprenticeship')}
          value={EmploymentType.Apprenticeship}
        />
        <Picker.Item
          label={t('position.employment_type_freelance')}
          value={EmploymentType.Freelance}
        />
      </ThemedPicker>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('position.company_placeholder')}
        value={company?.name}
        //onChangeText={setCompany}
      />
      <ThemedTextInput
        inputMode='text'
        placeholder={t('position.location_placeholder')}
        value={location}
        onChangeText={setLocation}
      />
      <ThemedPicker
        placeholder={t('position.location_type_placeholder')}
        selectedValue={locationType}
        onValueChange={(value) => setLocationType(value as LocationType)}
      >
        <Picker.Item
          label={t('position.location_type_on_site')}
          value={LocationType.OnSite}
        />
        <Picker.Item
          label={t('position.location_type_remote')}
          value={LocationType.Remote}
        />
        <Picker.Item
          label={t('position.location_type_hybrid')}
          value={LocationType.Hybrid}
        />
      </ThemedPicker>
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
        placeholder={t('position.description_placeholder')}
        value={description}
        onChangeText={setDescription}
      />
      <ThemedTextInput
        inputMode='text' // TODO: make this it's own component that allows adding multiple skills/tags
        placeholder={t('position.skills_placeholder')}
        value={skills.join(', ')}
        onChangeText={(text) =>
          setSkills(text.split(',').map((skill) => skill.trim()))
        }
      />
    </ScrollView>
  );
});

AddPositionForm.displayName = 'AddPositionForm';
