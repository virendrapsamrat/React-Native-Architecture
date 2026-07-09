import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';

export const buttonStyles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  ghost: {
    backgroundColor: Colors.transparent,
  },
  lg: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  md: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  outlineText: {
    color: Colors.primary,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  primaryText: {
    color: Colors.textLight,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontFamily: Fonts.medium,
    fontSize: Fonts.sizes.md,
  },
});
