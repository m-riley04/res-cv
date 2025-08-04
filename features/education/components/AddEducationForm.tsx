import { Activity, Degree, Education, Institution } from '@/api';
import { ThemedTextInput } from '@/components';
import { AddModalFormRef } from '@/components/common/AddModal';
import { DateTimePicker } from '@/components/common/DateTimePicker';
import { ThemedPicker } from '@/components/common/ThemedPicker';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

export interface AddEducationFormProps {}

export const AddEducationForm = forwardRef<
  AddModalFormRef<Education>,
  AddEducationFormProps
>(({}, ref) => {
  const { t } = useTranslation();
  const [majors, setMajors] = useState<Degree[]>([]);
  const [minors, setMinors] = useState<Degree[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [institution, setInstitution] = useState<Institution>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [gpa, setGpa] = useState<number | undefined>(undefined);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (
        !fieldOfStudy.trim() ||
        !institution ||
        !startDate ||
        !endDate ||
        !gpa
      ) {
        return null;
      }
      return {
        id: Date.now(), // TODO: generate ID differently, likely will come from backend
        fieldOfStudy: fieldOfStudy.trim(),
        institution,
        startDate,
        endDate,
        gpa,
        majors,
        minors,
        activities,
      };
    },
    isValid: () => {
      return (
        fieldOfStudy.trim().length > 0 &&
        institution !== undefined &&
        startDate !== undefined &&
        endDate !== undefined &&
        gpa !== undefined
      );
    },
  }));

  return (
    <ScrollView>
      <ThemedTextInput
        inputMode='text'
        placeholder={t('education.field_of_study_placeholder')}
        value={fieldOfStudy}
        onChangeText={setFieldOfStudy}
      />
      <ThemedPicker
        placeholder={t('education.institution_placeholder')}
        selectedValue={institution}
        onValueChange={(value) => setInstitution(value as Institution)}
      >
        {/* Map through institutions and create Picker.Item for each */}
      </ThemedPicker>
      <DateTimePicker value={startDate ?? new Date()} onChange={setStartDate} />
      <DateTimePicker value={endDate ?? new Date()} onChange={setEndDate} />
      <ThemedTextInput
        inputMode='decimal'
        placeholder={t('education.gpa_placeholder')}
        value={gpa !== undefined ? gpa.toString() : '4.0'}
        onChangeText={(text) => setGpa(text ? parseFloat(text) : undefined)}
      />
    </ScrollView>
  );
});

AddEducationForm.displayName = 'AddEducationForm';
