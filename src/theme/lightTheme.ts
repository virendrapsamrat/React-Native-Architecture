import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

export const lightTheme = {
  mode: 'light' as const,
  colors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    background: Colors.background,
    surface: Colors.surface,
    text: Colors.text,
    textSecondary: Colors.textSecondary,
    border: Colors.border,
    error: Colors.error,
    success: Colors.success,
    warning: Colors.warning,
  },
  fonts: Fonts,
};

export type Theme = typeof lightTheme;
