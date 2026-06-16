import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const avatarStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: { width: 32, height: 32, borderRadius: 16 },
  md: { width: 48, height: 48, borderRadius: 24 },
  lg: { width: 64, height: 64, borderRadius: 32 },
  xl: { width: 96, height: 96, borderRadius: 48 },
  image: { width: '100%', height: '100%' },
  initials: {
    fontWeight: '600',
    color: Colors.primary,
  },
});
