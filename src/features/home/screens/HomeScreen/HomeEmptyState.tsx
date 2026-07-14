import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';
import type { Theme } from '@/theme/ThemeProvider';
import { styles } from './HomeScreen.styles';

interface HomeEmptyStateProps {
  error: string | null;
  theme: Theme;
  onRefresh: () => void;
}

export const HomeEmptyState: React.FC<HomeEmptyStateProps> = ({ error, theme, onRefresh }) => {
  const isError = Boolean(error);

  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>{isError ? '⚠️' : '🔍'}</Text>
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        {isError ? 'Something went wrong' : 'No stories found'}
      </Text>
      <Text style={[styles.emptySub, { color: theme.colors.textSecondary }]}>
        {isError ? (error ?? '') : 'Try a different search term or filter.'}
      </Text>
      <TouchableOpacity
        style={[styles.retryBtn, { backgroundColor: Colors.primary }]}
        onPress={onRefresh}
        activeOpacity={0.8}
      >
        <Text style={styles.retryBtnText}>{isError ? 'Try Again' : 'Refresh'}</Text>
      </TouchableOpacity>
    </View>
  );
};
