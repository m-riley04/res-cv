import { Activity, Education, EducationSchema } from '@/api';
import { useMajors } from '@/api/majors/hooks';
import { Major, MajorIndexableProperty } from '@/api/majors/models';
import {
  University,
  UniversityIndexableProperty,
  useUniversities,
} from '@/api/universities';
import { SearchableDropdownList, ThemedTextInput } from '@/components';
import { AddModalFormRef } from '@/components/common/AddModal';
import { CrossPlatformDatePicker } from '@/components/common/CrossPlatformDatePicker';
import { Spacing } from '@/constants';
import { MessageType } from '@/messaging/enums';
import { useMessages } from '@/messaging/hooks';
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet } from 'react-native';
import { SearchableDropdown } from '../common/SearchableDropdown';

export const AddEducationForm = forwardRef<AddModalFormRef<Education>>(
  (_, ref) => {
    const { t } = useTranslation();
    const [majors, setMajors] = useState<Major[]>([]);
    const [minors, setMinors] = useState<Major[]>([]);
    const [university, setUniversity] = useState<University>();
    const [activities, _setActivities] = useState<Activity[]>([]);
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [gpa, setGpa] = useState<number | undefined>(undefined);

    const { queryUniversities, getLabel: getUniversityLabel } =
      useUniversities();
    const {
      queryMajors,
      getLabel: getMajorLabel,
      getKey: getMajorKey,
    } = useMajors();

    const messenger = useMessages();

    const parsedEducation = useMemo(() => {
      return EducationSchema.safeParse({
        id: Date.now(), // TODO: generate ID differently, likely will come from backend
        university,
        startDate,
        endDate,
        gpa,
        majors,
        minors,
        activities,
      });
    }, [university, startDate, endDate, gpa, majors, minors, activities]);

    useImperativeHandle(
      ref,
      () => ({
        getData: () => {
          if (!parsedEducation?.success) {
            messenger.message(
              `Invalid education data: ${parsedEducation.error.message}`,
              MessageType.Error
            );
            return null;
          }
          return parsedEducation.data as Education;
        },
        isValid: () => {
          return parsedEducation.success;
        },
      }),
      [parsedEducation, messenger]
    );

    const handleGpaChange = useCallback(
      (text: string) => {
        const normalized = text?.replace(',', '.').trim();
        if (!normalized) {
          setGpa(undefined);
          return;
        }
        const value = Number(normalized);
        if (Number.isNaN(value)) {
          messenger.message(`Invalid GPA value: ${text}`, MessageType.Error);
          return;
        }
        // Clamp to [0, 6] to match schema
        const clamped = Math.max(0, Math.min(6, value));
        setGpa(clamped);
      },
      [messenger, setGpa]
    );

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
        <SearchableDropdownList<Major>
          data={majors}
          getLabel={getMajorLabel}
          onPressRemove={handleDeleteMajor}
          keyExtractor={getMajorKey}
          queryFunc={searchMajors}
          onSelect={handleSelectMajor}
          placeholder={t('education.major_placeholder')}
        />
        <SearchableDropdownList<Major>
          data={minors}
          getLabel={getMajorLabel}
          onPressRemove={handleDeleteMinor}
          keyExtractor={getMajorKey}
          queryFunc={searchMajors}
          onSelect={handleSelectMinor}
          placeholder={t('education.minor_placeholder')}
        />
        <SearchableDropdown<University>
          getLabel={getUniversityLabel}
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
          inputMode='decimal'
          keyboardType='numbers-and-punctuation'
          placeholder={t('education.gpa_placeholder')}
          value={gpa?.toString()}
          onChangeText={handleGpaChange}
        />
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  container: {},
  formContainer: {
    gap: Spacing.formInputPadding,
  },
});

AddEducationForm.displayName = 'AddEducationForm';
