import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const settingsSectionStyles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  content: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
