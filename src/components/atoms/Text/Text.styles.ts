import { StyleSheet } from 'react-native';
import { Fonts } from '../../../constants/Fonts';

export const textStyles = StyleSheet.create({
  body: { fontSize: Fonts.sizes.md, fontWeight: '400' },
  caption: { fontSize: Fonts.sizes.sm, fontWeight: '400' },
  h1: { fontSize: Fonts.sizes.xxxl, fontWeight: '700' },
  h2: { fontSize: Fonts.sizes.xxl, fontWeight: '600' },
  h3: { fontSize: Fonts.sizes.xl, fontWeight: '600' },
  label: { fontSize: Fonts.sizes.sm, fontWeight: '500' },
});
