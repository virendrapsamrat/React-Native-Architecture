import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const productCardStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  content: {
    padding: 12,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  image: {
    backgroundColor: Colors.border,
    height: 160,
    width: '100%',
  },
});
