import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';
import { useTheme } from '@/theme/ThemeProvider';
import { textStyles } from './Text.styles';

type TextVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <RNText
      style={[
        textStyles[variant],
        { color: color ?? theme.colors.text },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};
