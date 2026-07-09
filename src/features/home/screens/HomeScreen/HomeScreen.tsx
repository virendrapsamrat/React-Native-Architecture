import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Animated,
  FlatList,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme, type Theme } from '@/theme/ThemeProvider';
import { useHomeViewModel, type SortOption } from '@/features/home/hooks/useHomeViewModel';
import type { HNHit, HNStoryTag } from '@/types/HNStory';

// ─── helpers ─────────────────────────────────────────────────────────────────

const timeAgo = (iso: string): string => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

const getDomain = (url: string | null): string | null => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

// Colours stored as constants, not inline literals
const TAG_COLORS = {
  ask: '#8B5CF6',
  show: '#10B981',
  job: '#F59E0B',
} as const;

// ─── animated story card ──────────────────────────────────────────────────────

interface StoryCardProps {
  item: HNHit;
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ item, index }) => {
  const { theme } = useTheme();

  // useMemo creates a stable Animated.Value without needing .current in JSX
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
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, tension: 120, friction: 8 }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 120, friction: 8 }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    if (item.url) Linking.openURL(item.url).catch(() => null);
  }, [item.url]);

  const domain = getDomain(item.url);
  const isAsk = item._tags?.includes('ask_hn');
  const isShow = item._tags?.includes('show_hn');
  const isJob = item._tags?.includes('job');

  let tagLabel: string | null = null;
  let tagBg: string = Colors.primary;
  if (isAsk) { tagLabel = 'Ask'; tagBg = TAG_COLORS.ask; }
  else if (isShow) { tagLabel = 'Show'; tagBg = TAG_COLORS.show; }
  else if (isJob) { tagLabel = 'Job'; tagBg = TAG_COLORS.job; }

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
        {/* Badge + domain row */}
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

        {/* Title */}
        <Text style={[styles.cardTitle, { color: theme.colors.text }]} numberOfLines={3}>
          {item.title}
        </Text>

        {/* Footer */}
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

// ─── filter / sort config ─────────────────────────────────────────────────────

interface TagConfig { label: string; value: HNStoryTag; emoji: string }

const TAG_OPTIONS: TagConfig[] = [
  { label: 'Top Stories', value: 'story',   emoji: '🔥' },
  { label: 'Ask HN',      value: 'ask_hn',  emoji: '❓' },
  { label: 'Show HN',     value: 'show_hn', emoji: '🚀' },
  { label: 'Jobs',        value: 'job',     emoji: '💼' },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest',        value: 'newest'   },
  { label: 'Top Points',    value: 'points'   },
  { label: 'Most Comments', value: 'comments' },
];

interface HomeListHeaderProps {
  theme: Theme;
  searchText: string;
  selectedTag: HNStoryTag;
  sortBy: SortOption;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: (tag: HNStoryTag) => void;
  setSortBy: (sort: SortOption) => void;
}

const HomeListHeader: React.FC<HomeListHeaderProps> = ({
  theme,
  searchText,
  selectedTag,
  sortBy,
  setSearchText,
  setSelectedTag,
  setSortBy,
}) => (
  <View style={styles.listHeader}>
    {/* Title row */}
    <View style={styles.titleRow}>
      <View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Hacker News</Text>
        <Text style={[styles.headerSub, { color: theme.colors.textSecondary }]}>Top tech stories, updated live</Text>
      </View>
      <View style={[styles.hnBadge, { backgroundColor: Colors.warning }]}>
        <Text style={styles.hnBadgeText}>HN</Text>
      </View>
    </View>

    {/* Search bar */}
    <View style={[styles.searchBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={[styles.searchInput, { color: theme.colors.text }]}
        placeholder="Search stories…"
        placeholderTextColor={theme.colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>

    {/* Tag filter pills */}
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagRow}>
      {TAG_OPTIONS.map((t) => {
        const active = selectedTag === t.value;
        return (
          <TouchableOpacity
            key={t.value}
            onPress={() => setSelectedTag(t.value)}
            activeOpacity={0.75}
            style={[
              styles.tagPill,
              active
                ? { backgroundColor: Colors.primary, borderColor: Colors.primary }
                : { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Text style={styles.tagEmoji}>{t.emoji}</Text>
            <Text style={[styles.tagPillText, { color: active ? Colors.textLight : theme.colors.textSecondary }]}>
              {t.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>

    {/* Sort chips */}
    <View style={styles.sortRow}>
      <Text style={[styles.sortLabel, { color: theme.colors.textSecondary }]}>Sort:</Text>
      {SORT_OPTIONS.map((s) => {
        const active = sortBy === s.value;
        return (
          <TouchableOpacity
            key={s.value}
            onPress={() => setSortBy(s.value)}
            activeOpacity={0.75}
            style={[
              styles.sortChip,
              active
                ? { backgroundColor: `${Colors.primary}20`, borderColor: Colors.primary }
                : { borderColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.sortChipText, { color: active ? Colors.primary : theme.colors.textSecondary }]}>
              {s.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    {/* Divider */}
    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
  </View>
);

// ─── main screen ──────────────────────────────────────────────────────────────

export const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 400);

  const {
    stories,
    isLoading,
    isRefreshing,
    isFetchingNextPage,
    hasNextPage,
    error,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    refresh,
    loadMore,
  } = useHomeViewModel(debouncedSearch);

  // ── render helpers ──────────────────────────────────────────────────────────

  const renderItem = useCallback(
    ({ item, index }: { item: HNHit; index: number }) => (
      <StoryCard item={item} index={index} />
    ),
    [],
  );

  const keyExtractor = useCallback((item: HNHit) => item.objectID, []);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>Loading more…</Text>
      </View>
    );
  }, [isFetchingNextPage, theme]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
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
          onPress={refresh}
          activeOpacity={0.8}
        >
          <Text style={styles.retryBtnText}>{isError ? 'Try Again' : 'Refresh'}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [isLoading, error, theme, refresh]);

  // ── skeleton placeholders while loading ─────────────────────────────────────

  const skeletonData = useMemo(
    () => (isLoading ? ['s0', 's1', 's2', 's3', 's4', 's5'] : []),
    [isLoading],
  );

  const renderSkeleton = useCallback(
    ({ item }: { item: string }) => (
      <View key={item} style={[styles.skeleton, { backgroundColor: theme.colors.border }]} />
    ),
    [theme],
  );

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {isLoading ? (
        /* Skeleton list while loading first page */
        <FlatList
          data={skeletonData}
          keyExtractor={(item) => item}
          renderItem={renderSkeleton}
          ListHeaderComponent={
            <HomeListHeader
              theme={theme}
              searchText={searchText}
              selectedTag={selectedTag}
              sortBy={sortBy}
              setSearchText={setSearchText}
              setSelectedTag={setSelectedTag}
              setSortBy={setSortBy}
            />
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={stories}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={
            <HomeListHeader
              theme={theme}
              searchText={searchText}
              selectedTag={selectedTag}
              sortBy={sortBy}
              setSearchText={setSearchText}
              setSelectedTag={setSelectedTag}
              setSortBy={setSortBy}
            />
          }
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={hasNextPage ? loadMore : undefined}
          onEndReachedThreshold={0.4}
          refreshing={isRefreshing}
          onRefresh={refresh}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          removeClippedSubviews
        />
      )}
    </SafeAreaView>
  );
};

// ─── stylesheet ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  authorRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    padding: 16,
    shadowColor: Colors.text,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
  },
  cardMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  cardWrapper: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    marginBottom: 12,
    marginTop: 4,
  },
  domainText: {
    flex: 1,
    fontSize: 11,
    marginLeft: 6,
  },
  dot: {
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptySub: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerLoader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  hnBadge: {
    alignItems: 'center',
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  hnBadgeText: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '800',
  },
  listContent: {
    paddingBottom: 40,
  },
  listHeader: {
    paddingBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  metaText: {
    fontSize: 12,
  },
  pointsBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '700',
  },
  retryBtn: {
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  retryBtnText: {
    color: Colors.textLight,
    fontWeight: '700',
  },
  root: {
    flex: 1,
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  skeleton: {
    borderRadius: 14,
    height: 110,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  sortChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  sortRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
    marginTop: 8,
  },
  tagBadge: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagBadgeText: {
    color: Colors.textLight,
    fontSize: 10,
    fontWeight: '700',
  },
  tagEmoji: {
    fontSize: 13,
    marginRight: 4,
  },
  tagPill: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tagRow: {
    gap: 8,
    paddingBottom: 2,
    paddingRight: 8,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
