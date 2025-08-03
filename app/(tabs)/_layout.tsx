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
        name={Tab.Account}
        options={{
          title: t('tabs.account'),
        }}
      />
      <Tabs.Screen
        name={Tab.Settings}
        options={{
          title: t('tabs.settings'),
        }}
      />
    </Tabs>
  );
}
