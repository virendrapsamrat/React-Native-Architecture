import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { profileTemplateStyles } from './ProfileTemplate.styles';

interface ProfileTemplateProps {
  header: React.ReactNode;
  stats?: React.ReactNode;
  children?: React.ReactNode;
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({
  header,
  stats,
  children,
}) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[profileTemplateStyles.container, { backgroundColor: theme.colors.background }]}
    >
      <ScrollView contentContainerStyle={profileTemplateStyles.scrollContent}>
        {header}
        {stats}
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
