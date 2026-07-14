import { Colors } from '@/constants/Colors';
import type { SortOption } from '@/features/home/hooks/useHomeViewModel';
import type { HNHit, HNStoryTag } from '@/types/HNStory';

export const timeAgo = (iso: string): string => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export const getDomain = (url: string | null): string | null => {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
};

export const getStoryUrl = (story: HNHit): string => {
  if (story.url) return story.url;
  return `https://news.ycombinator.com/item?id=${story.story_id ?? story.objectID}`;
};

export const getDiscussionUrl = (story: HNHit): string =>
  `https://news.ycombinator.com/item?id=${story.story_id ?? story.objectID}`;

export const TAG_COLORS = {
  ask: '#8B5CF6',
  show: '#10B981',
  job: '#F59E0B',
} as const;

export interface TagConfig {
  label: string;
  value: HNStoryTag;
  emoji: string;
}

export const TAG_OPTIONS: TagConfig[] = [
  { label: 'Top Stories', value: 'story', emoji: '🔥' },
  { label: 'Ask HN', value: 'ask_hn', emoji: '❓' },
  { label: 'Show HN', value: 'show_hn', emoji: '🚀' },
  { label: 'Jobs', value: 'job', emoji: '💼' },
];

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Top Points', value: 'points' },
  { label: 'Most Comments', value: 'comments' },
];

export const DEFAULT_TAG_COLOR = Colors.primary;
