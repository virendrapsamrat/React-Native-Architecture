import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { loaderStyles } from './Loader.styles';

interface LoaderProps {
  size?: 'small' | 'large';
  overlay?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'large',
  overlay = false,
}) => {
  const { theme } = useTheme();

  return (
    <View style={overlay ? loaderStyles.overlay : loaderStyles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};
