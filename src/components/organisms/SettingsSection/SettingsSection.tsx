import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { useTheme } from '@/theme/ThemeProvider';
import { settingsSectionStyles } from './SettingsSection.styles';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <View style={settingsSectionStyles.container}>
      <Text variant="label" style={[settingsSectionStyles.title, { color: theme.colors.textSecondary }]}>
        {title}
      </Text>
      <View style={[settingsSectionStyles.content, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
        {children}
      </View>
    </View>
  );
};
