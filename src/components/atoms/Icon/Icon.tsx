import React from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  style,
}) => {
  const { theme } = useTheme();

  return (
    <Text style={[{ fontSize: size, color: color ?? theme.colors.text }, style]}>
      {name}
    </Text>
  );
};
