import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const settingsSectionStyles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  content: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  title: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
});
