import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Animated,
  ActivityIndicator,
  FlatList,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from '@/components/atoms/Icon';
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

const getStoryUrl = (story: HNHit): string => {
  if (story.url) return story.url;
  return `https://news.ycombinator.com/item?id=${story.story_id ?? story.objectID}`;
};

const getDiscussionUrl = (story: HNHit): string =>
  `https://news.ycombinator.com/item?id=${story.story_id ?? story.objectID}`;

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
  onOpenStory: (story: HNHit) => void;
}

const StoryCard: React.FC<StoryCardProps> = ({ item, index, onOpenStory }) => {
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
    onOpenStory(item);
  }, [item, onOpenStory]);

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

interface StoryModalProps {
  story: HNHit | null;
  theme: Theme;
  onClose: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ story, theme, onClose }) => {
  const storyUrl = story ? getStoryUrl(story) : null;
  const discussionUrl = story ? getDiscussionUrl(story) : null;
  const domain = getDomain(storyUrl);

  const openLink = useCallback((url: string) => {
    Linking.openURL(url).catch(() => null);
  }, []);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      visible={story !== null}
    >
      <SafeAreaView style={[styles.storyModalRoot, { backgroundColor: theme.colors.background }]}>
        <View style={styles.storyModalShell}>
          <View style={styles.storyModalHeader}>
            <View style={styles.storyModalTitleWrap}>
              <Text
                style={[styles.storyModalTitle, { color: theme.colors.text }]}
                numberOfLines={1}
              >
                {story?.title ?? 'Story'}
              </Text>
              {domain !== null && (
                <Text
                  style={[styles.storyModalDomain, { color: theme.colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {domain}
                </Text>
              )}
            </View>
            <Pressable
              accessibilityLabel="Close story"
              accessibilityRole="button"
              onPress={onClose}
              style={[styles.storyModalClose, { borderColor: theme.colors.border }]}
            >
              <Icon name="X" size={22} color={theme.colors.text} />
            </Pressable>
          </View>

          <View
            style={[
              styles.storyContentFrame,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.storyContent}
              showsVerticalScrollIndicator={false}
            >
              <Text style={[styles.storyDetailTitle, { color: theme.colors.text }]}>
                {story?.title ?? 'Story'}
              </Text>

              <View style={styles.storyMetaGrid}>
                <View style={[styles.storyMetaItem, { borderColor: theme.colors.border }]}>
                  <Text style={[styles.storyMetaLabel, { color: theme.colors.textSecondary }]}>Points</Text>
                  <Text style={[styles.storyMetaValue, { color: theme.colors.text }]}>
                    {story?.points ?? 0}
                  </Text>
                </View>
                <View style={[styles.storyMetaItem, { borderColor: theme.colors.border }]}>
                  <Text style={[styles.storyMetaLabel, { color: theme.colors.textSecondary }]}>Comments</Text>
                  <Text style={[styles.storyMetaValue, { color: theme.colors.text }]}>
                    {story?.num_comments ?? 0}
                  </Text>
                </View>
              </View>

              <View style={styles.storySection}>
                <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Author</Text>
                <Text style={[styles.storySectionValue, { color: theme.colors.text }]}>
                  {story?.author ?? 'Unknown'}
                </Text>
              </View>

              <View style={styles.storySection}>
                <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Published</Text>
                <Text style={[styles.storySectionValue, { color: theme.colors.text }]}>
                  {story ? timeAgo(story.created_at) : ''}
                </Text>
              </View>

              {domain !== null && (
                <View style={styles.storySection}>
                  <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Source</Text>
                  <Text style={[styles.storySectionValue, { color: theme.colors.text }]}>
                    {domain}
                  </Text>
                </View>
              )}

              {story?._tags?.length ? (
                <View style={styles.storySection}>
                  <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Tags</Text>
                  <View style={styles.storyTagList}>
                    {story._tags.map((tag) => (
                      <View
                        key={tag}
                        style={[styles.storyTag, { borderColor: theme.colors.border }]}
                      >
                        <Text style={[styles.storyTagText, { color: theme.colors.textSecondary }]}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {storyUrl !== null && (
                <View style={styles.storySection}>
                  <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Story URL</Text>
                  <View
                    style={[styles.storyLinkButton, { borderColor: theme.colors.border }]}
                  >
                    <View style={styles.storyLinkCopyTarget}>
                      <Text
                        selectable
                        style={[styles.storyLinkText, { color: Colors.primary }]}
                        numberOfLines={2}
                      >
                        {storyUrl}
                      </Text>
                    </View>
                    <Pressable
                      accessibilityLabel="Open story link in browser"
                      accessibilityRole="link"
                      onPress={() => openLink(storyUrl)}
                      style={styles.storyLinkIconButton}
                    >
                      <Icon name="ExternalLink" size={18} color={Colors.primary} />
                    </Pressable>
                  </View>
                </View>
              )}

              {discussionUrl !== null && (
                <View style={styles.storySection}>
                  <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>HN Discussion</Text>
                  <View
                    style={[styles.storyLinkButton, { borderColor: theme.colors.border }]}
                  >
                    <View style={styles.storyLinkCopyTarget}>
                      <Text
                        selectable
                        style={[styles.storyLinkText, { color: Colors.primary }]}
                        numberOfLines={2}
                      >
                        {discussionUrl}
                      </Text>
                    </View>
                    <Pressable
                      accessibilityLabel="Open discussion link in browser"
                      accessibilityRole="link"
                      onPress={() => openLink(discussionUrl)}
                      style={styles.storyLinkIconButton}
                    >
                      <Icon name="ExternalLink" size={18} color={Colors.primary} />
                    </Pressable>
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
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
  const [selectedStory, setSelectedStory] = useState<HNHit | null>(null);
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
      <StoryCard item={item} index={index} onOpenStory={setSelectedStory} />
    ),
    [],
  );

  const keyExtractor = useCallback(
    (item: HNHit, index: number) => `${item.objectID}-${index}`,
    [],
  );

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
      <StoryModal
        story={selectedStory}
        theme={theme}
        onClose={() => setSelectedStory(null)}
      />
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
  storyContent: {
    padding: 18,
    paddingBottom: 28,
  },
  storyContentFrame: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
  },
  storyDetailTitle: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 18,
  },
  storyLinkButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 8,
  },
  storyLinkCopyTarget: {
    flex: 1,
    paddingVertical: 4,
  },
  storyLinkIconButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  storyLinkText: {
    fontSize: 14,
    lineHeight: 20,
  },
  storyMetaGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  storyMetaItem: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  storyMetaLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  storyMetaValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  storyModalClose: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  storyModalDomain: {
    fontSize: 12,
    marginTop: 2,
  },
  storyModalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  storyModalRoot: {
    flex: 1,
  },
  storyModalShell: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  storyModalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  storyModalTitleWrap: {
    flex: 1,
  },
  storySection: {
    marginBottom: 18,
  },
  storySectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  storySectionValue: {
    fontSize: 15,
    lineHeight: 22,
  },
  storyTag: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  storyTagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  storyTagText: {
    fontSize: 12,
    fontWeight: '600',
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
