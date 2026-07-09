import axios from 'axios';
import type { HNSearchResponse, HNStoryTag } from '@/types/HNStory';

const HN_BASE_URL = 'https://hn.algolia.com/api/v1/search_by_date';

export const HNService = {
  fetchStories: async (
    query: string,
    tag: HNStoryTag,
    page: number,
  ): Promise<HNSearchResponse> => {
    const response = await axios.get<HNSearchResponse>(HN_BASE_URL, {
      params: {
        tags: tag,
        query: query.trim() || undefined,
        page,
      },
    });
    return response.data;
  },
};
