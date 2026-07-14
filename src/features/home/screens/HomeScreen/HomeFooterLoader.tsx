import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';
import type { Theme } from '@/theme/ThemeProvider';
import { styles } from './HomeScreen.styles';

interface HomeFooterLoaderProps {
  theme: Theme;
}

export const HomeFooterLoader: React.FC<HomeFooterLoaderProps> = ({ theme }) => (
  <View style={styles.footerLoader}>
    <ActivityIndicator size="small" color={Colors.primary} />
    <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Loading more...</Text>
  </View>
);
