import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/tabBar/HapticTab';
import { Tab } from '@/enums';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';

export default function TabLayout() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name={Tab.Home}
        options={{
          title: t('tabs.home'),
        }}
      />
      <Tabs.Screen
        name={Tab.ContactInfo}
        options={{
          title: t('tabs.contact_info'),
        }}
      />
      <Tabs.Screen
        name={Tab.Education}
        options={{
          title: t('tabs.education'),
        }}
      />
      <Tabs.Screen
        name={Tab.Experience}
        options={{
          title: t('tabs.experience'),
        }}
      />
      <Tabs.Screen
        name={Tab.Projects}
        options={{
          title: t('tabs.projects'),
        }}
      />
      <Tabs.Screen
        name={Tab.Skills}
        options={{
          title: t('tabs.skills'),
        }}
      />
      <Tabs.Screen
        name={Tab.Awards}
        options={{
          title: t('tabs.awards'),
        }}
      />
    </Tabs>
  );
}
