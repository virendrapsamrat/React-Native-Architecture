import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';
import { mainTemplateStyles } from './MainTemplate.styles';

interface MainTemplateProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({
  children,
  header,
}) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      style={[mainTemplateStyles.container, { backgroundColor: theme.colors.background }]}
    >
      {header}
      <View style={mainTemplateStyles.content}>{children}</View>
    </SafeAreaView>
  );
};
