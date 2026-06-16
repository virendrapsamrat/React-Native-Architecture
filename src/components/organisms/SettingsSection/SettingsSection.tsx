import React from 'react';
import { View } from 'react-native';
import { Text } from '../../atoms/Text';
import { settingsSectionStyles } from './SettingsSection.styles';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  children,
}) => (
  <View style={settingsSectionStyles.container}>
    <Text variant="label" style={settingsSectionStyles.title}>
      {title}
    </Text>
    <View style={settingsSectionStyles.content}>{children}</View>
  </View>
);
