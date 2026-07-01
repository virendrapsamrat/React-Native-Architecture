import { useState, useCallback, useMemo } from 'react';
import { useHNStoriesQuery } from '../hooks/useHNStoriesQuery';
import type { HNHit, HNStoryTag } from '../types/HNStory';

export type SortOption = 'newest' | 'points' | 'comments';

export const useHomeViewModel = (searchQuery = '') => {
  const [selectedTag, setSelectedTag] = useState<HNStoryTag>('story');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
    error,
  } = useHNStoriesQuery({ query: searchQuery, tag: selectedTag });

  // Flatten paginated pages into a single sorted list
  const stories = useMemo<HNHit[]>(() => {
    if (!data) return [];
    const flat = data.pages.flatMap((page: import('../types/HNStory').HNSearchResponse) => page.hits);

    if (sortBy === 'points') {
      return [...flat].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
    }
    if (sortBy === 'comments') {
      return [...flat].sort(
        (a, b) => (b.num_comments ?? 0) - (a.num_comments ?? 0),
      );
    }
    // Default: newest — API already sorts by date
    return flat;
  }, [data, sortBy]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    stories,
    isLoading,
    isRefreshing: isRefetching,
    isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    error: error instanceof Error ? error.message : null,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    refresh: handleRefresh,
    loadMore: handleLoadMore,
  };
};
