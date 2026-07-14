import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { useDebounce } from '@/hooks/useDebounce';
import { useTheme } from '@/theme/ThemeProvider';
import { useHomeViewModel } from '@/features/home/hooks/useHomeViewModel';
import type { HNHit } from '@/types/HNStory';
import { HomeEmptyState } from './HomeEmptyState';
import { HomeFooterLoader } from './HomeFooterLoader';
import { HomeListHeader } from './HomeListHeader';
import { styles } from './HomeScreen.styles';
import { StoryCard } from './StoryCard';
import { StoryModal } from './StoryModal';

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

  const listHeader = useMemo(
    () => (
      <HomeListHeader
        theme={theme}
        searchText={searchText}
        selectedTag={selectedTag}
        sortBy={sortBy}
        setSearchText={setSearchText}
        setSelectedTag={setSelectedTag}
        setSortBy={setSortBy}
      />
    ),
    [theme, searchText, selectedTag, sortBy, setSelectedTag, setSortBy],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: HNHit; index: number }) => (
      <StoryCard item={item} index={index} onOpenStory={setSelectedStory} />
    ),
    [],
  );

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return <HomeFooterLoader theme={theme} />;
  }, [isFetchingNextPage, theme]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    return <HomeEmptyState error={error} theme={theme} onRefresh={refresh} />;
  }, [isLoading, error, theme, refresh]);

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

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.colors.background }]}>
      {isLoading ? (
        <FlatList
          data={skeletonData}
          keyExtractor={(item) => item}
          renderItem={renderSkeleton}
          ListHeaderComponent={listHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <FlatList
          data={stories}
          keyExtractor={(item, index) => `${item.objectID}-${index}`}
          renderItem={renderItem}
          ListHeaderComponent={listHeader}
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
      <StoryModal story={selectedStory} theme={theme} onClose={() => setSelectedStory(null)} />
    </SafeAreaView>
  );
};
