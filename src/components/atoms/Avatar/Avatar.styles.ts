import { StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';

export const avatarStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { height: '100%', width: '100%' },
  initials: {
    color: Colors.primary,
    fontWeight: '600',
  },
  lg: { borderRadius: 32, height: 64, width: 64 },
  md: { borderRadius: 24, height: 48, width: 48 },
  sm: { borderRadius: 16, height: 32, width: 32 },
  xl: { borderRadius: 48, height: 96, width: 96 },
});
