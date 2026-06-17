import { StyleSheet } from 'react-native';
import { useTheme } from '../../../theme/ThemeProvider';

export const useUserStatStyles = () => {
  const { theme } = useTheme();
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 12,
    },
    label: {
      color: theme.colors.textSecondary,
      marginTop: 4,
    },
    value: {
      color: theme.colors.text,
    },
  });
};
