import { useInfiniteQuery } from '@tanstack/react-query';
import { HNService } from '../services/HNService';
import type { HNSearchResponse, HNStoryTag } from '../types/HNStory';

interface UseHNStoriesQueryOptions {
  query?: string;
  tag?: HNStoryTag;
}

export const useHNStoriesQuery = ({
  query = '',
  tag = 'story',
}: UseHNStoriesQueryOptions = {}) => {
  return useInfiniteQuery<HNSearchResponse, Error>({
    queryKey: ['hn-stories', { query, tag }],
    queryFn: ({ pageParam = 0 }) =>
      HNService.fetchStories(query, tag, pageParam as number),
    initialPageParam: 0,
    getNextPageParam: (lastPage: HNSearchResponse) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.nbPages ? nextPage : undefined;
    },
  });
};
