import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

export const darkTheme = {
  mode: 'dark' as const,
  colors: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    background: Colors.backgroundDark,
    surface: Colors.surfaceDark,
    text: Colors.textLight,
    textSecondary: Colors.textSecondary,
    border: Colors.borderDark,
    error: Colors.error,
    success: Colors.success,
    warning: Colors.warning,
  },
  fonts: Fonts,
};
