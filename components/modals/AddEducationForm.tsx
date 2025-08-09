import { Activity, Education, EducationSchema } from '@/api';
import { useMajors } from '@/api/majors/hooks';
import { Major, MajorIndexableProperty } from '@/api/majors/models';
import {
  University,
  UniversityIndexableProperty,
  useUniversities,
} from '@/api/universities';
import { ThemedTextInput } from '@/components';
import { AddModalFormRef } from '@/components/common/AddModal';
import { CrossPlatformDatePicker } from '@/components/common/CrossPlatformDatePicker';
import { Spacing } from '@/constants';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { SearchableDropdown } from '../common/SearchableDropdown';
import { ListItem } from '../lists';

export interface AddEducationFormProps {}

export const AddEducationForm = forwardRef<
  AddModalFormRef<Education>,
  AddEducationFormProps
>(({}, ref) => {
  const { t } = useTranslation();
  const [majors, setMajors] = useState<Major[]>([]);
  const [minors, setMinors] = useState<Major[]>([]);
  const [fieldOfStudy, setFieldOfStudy] = useState<string | undefined>(
    undefined
  );
  const [university, setUniversity] = useState<University>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [gpa, setGpa] = useState<number | undefined>(undefined);

  const { queryUniversities } = useUniversities();
  const { queryMajors } = useMajors();

  const parsedEducation = useMemo(() => {
    return EducationSchema.safeParse({
      id: Date.now(), // TODO: generate ID differently, likely will come from backend
      fieldOfStudy,
      university,
      startDate,
      endDate,
      gpa,
      majors,
      minors,
      activities,
    });
  }, [
    fieldOfStudy,
    university,
    startDate,
    endDate,
    gpa,
    majors,
    minors,
    activities,
  ]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!parsedEducation?.success) {
        console.log('Invalid education data:', parsedEducation.error);
        return null;
      }
      return parsedEducation.data as Education;
    },
    isValid: () => {
      return parsedEducation.success;
    },
  }));

  const handleGpaChange = useCallback((text: string) => {
    const normalized = text?.replace(',', '.').trim();
    if (!normalized) {
      setGpa(undefined);
      return;
    }
    const value = Number(normalized);
    if (Number.isNaN(value)) {
      console.error('Invalid GPA value:', text);
      return;
    }
    // Clamp to [0, 6] to match schema
    const clamped = Math.max(0, Math.min(6, value));
    setGpa(clamped);
  }, []);

  const searchUniversities = useCallback(
    (query: string) => {
      return queryUniversities(query, UniversityIndexableProperty.Name).map(
        (univ) => ({
          ...univ,
          label: univ.name,
        })
      );
    },
    [queryUniversities]
  );

  const handleSelectUniversity = useCallback(
    (university: University) => {
      setUniversity(university);
    },
    [setUniversity]
  );

  const searchMajors = useCallback(
    (query: string) => {
      return queryMajors(query, MajorIndexableProperty.MajorName).map(
        (major) => ({
          ...major,
          label: major[MajorIndexableProperty.MajorName],
        })
      );
    },
    [queryMajors]
  );

  const handleSelectMajor = useCallback(
    (major: Major) => {
      setMajors((prev) => {
        const exists = prev.some(
          (m) =>
            m[MajorIndexableProperty.RowId] ===
            major[MajorIndexableProperty.RowId]
        );
        return exists ? prev : [...prev, major];
      });
    },
    [setMajors]
  );

  const handleSelectMinor = useCallback(
    (minor: Major) => {
      setMinors((prev) => {
        const exists = prev.some(
          (m) =>
            m[MajorIndexableProperty.RowId] ===
            minor[MajorIndexableProperty.RowId]
        );
        return exists ? prev : [...prev, minor];
      });
    },
    [setMinors]
  );

  const handleDeleteMajor = useCallback(
    (major: Major) => {
      setMajors((prev) =>
        prev.filter(
          (m) =>
            m[MajorIndexableProperty.RowId] !==
            major[MajorIndexableProperty.RowId]
        )
      );
    },
    [setMajors]
  );

  const handleDeleteMinor = useCallback(
    (minor: Major) => {
      setMinors((prev) =>
        prev.filter(
          (m) =>
            m[MajorIndexableProperty.RowId] !==
            minor[MajorIndexableProperty.RowId]
        )
      );
    },
    [setMinors]
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.formContainer}
    >
      <ThemedTextInput
        inputMode='text'
        placeholder={t('education.field_of_study_placeholder')}
        value={fieldOfStudy}
        onChangeText={setFieldOfStudy}
      />
      <FlatList
        data={majors}
        renderItem={({ item }) => (
          <ListItem<Major>
            item={item}
            getLabel={(item) => item[MajorIndexableProperty.MajorName]}
            onPressRemove={() => handleDeleteMajor(item)}
          />
        )}
        keyExtractor={(item) => item[MajorIndexableProperty.RowId].toString()}
        scrollEnabled={false}
      />
      <SearchableDropdown<Major>
        getLabel={(item) => item[MajorIndexableProperty.MajorName]}
        placeholder={t('education.major_placeholder')}
        queryFunc={searchMajors}
        onSelect={handleSelectMajor}
      />
      <FlatList
        data={minors}
        renderItem={({ item }: { item: Major }) => (
          <ListItem<Major>
            item={item}
            getLabel={(item) => item[MajorIndexableProperty.MajorName]}
            onPressRemove={() => handleDeleteMinor(item)}
          />
        )}
        keyExtractor={(item) => item[MajorIndexableProperty.RowId].toString()}
        scrollEnabled={false}
      />
      <SearchableDropdown<Major>
        getLabel={(item) => item[MajorIndexableProperty.MajorName]}
        placeholder={t('education.minor_placeholder')}
        queryFunc={searchMajors}
        onSelect={handleSelectMinor}
      />
      <SearchableDropdown<University>
        getLabel={(item) => item.name}
        placeholder={t('university.search')}
        queryFunc={searchUniversities}
        onSelect={handleSelectUniversity}
      />
      <CrossPlatformDatePicker
        value={startDate ?? new Date()}
        onChange={setStartDate}
      />
      <CrossPlatformDatePicker
        value={endDate ?? startDate ?? new Date()}
        onChange={setEndDate}
      />
      <ThemedTextInput
        inputMode='numeric'
        keyboardType='numeric'
        placeholder={t('education.gpa_placeholder')}
        value={gpa?.toString()}
        onChangeText={handleGpaChange}
      />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    gap: Spacing.formInputPadding,
  },
  listMajors: {
    minHeight: 50,
  },
});
