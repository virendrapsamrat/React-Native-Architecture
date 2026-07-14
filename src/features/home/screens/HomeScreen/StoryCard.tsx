import React, { useCallback, useEffect, useMemo } from 'react';
import { Animated, Pressable, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/theme/ThemeProvider';
import type { HNHit } from '@/types/HNStory';
import { DEFAULT_TAG_COLOR, getDomain, TAG_COLORS, timeAgo } from './HomeScreen.helpers';
import { styles } from './HomeScreen.styles';

interface StoryCardProps {
  item: HNHit;
  index: number;
  onOpenStory: (story: HNHit) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ item, index, onOpenStory }) => {
  const { theme } = useTheme();
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const slideAnim = useMemo(() => new Animated.Value(20), []);
  const scaleAnim = useMemo(() => new Animated.Value(1), []);

  useEffect(() => {
    const delay = Math.min(index * 50, 300);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        delay,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay,
        tension: 70,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      tension: 120,
      friction: 8,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 120,
      friction: 8,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    onOpenStory(item);
  }, [item, onOpenStory]);

  const domain = getDomain(item.url);
  const isAsk = item._tags?.includes('ask_hn');
  const isShow = item._tags?.includes('show_hn');
  const isJob = item._tags?.includes('job');

  let tagLabel: string | null = null;
  let tagBg: string = DEFAULT_TAG_COLOR;
  if (isAsk) {
    tagLabel = 'Ask';
    tagBg = TAG_COLORS.ask;
  } else if (isShow) {
    tagLabel = 'Show';
    tagBg = TAG_COLORS.show;
  } else if (isJob) {
    tagLabel = 'Job';
    tagBg = TAG_COLORS.job;
  }

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }, { scale: scaleAnim }] },
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.card, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}
      >
        <View style={styles.cardHeader}>
          {tagLabel !== null && (
            <View style={[styles.tagBadge, { backgroundColor: tagBg }]}>
              <Text style={styles.tagBadgeText}>{tagLabel}</Text>
            </View>
          )}
          {domain !== null && (
            <Text style={[styles.domainText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
              {domain}
            </Text>
          )}
        </View>

        <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={3}>
          {item.title}
        </Text>

        <View style={styles.cardFooter}>
          <View style={styles.cardMeta}>
            <View style={[styles.pointsBadge, { backgroundColor: theme.colors.background }]}>
              <Text style={[styles.pointsText, { color: Colors.primary }]}>▲ {item.points ?? 0}</Text>
            </View>
            <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>
              💬 {item.num_comments ?? 0}
            </Text>
          </View>
          <View style={styles.authorRow}>
            <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{item.author}</Text>
            <Text style={[styles.dot, { color: theme.colors.border }]}> · </Text>
            <Text style={[styles.metaText, { color: theme.colors.textSecondary }]}>{timeAgo(item.created_at)}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};
