export type HNStoryTag = 'story' | 'ask_hn' | 'show_hn' | 'job';

export interface HNHit {
  objectID: string;
  title: string;
  author: string;
  url: string | null;
  points: number | null;
  num_comments: number | null;
  created_at: string;
  created_at_i: number;
  story_id: number;
  _tags: string[];
}

export interface HNSearchResponse {
  hits: HNHit[];
  page: number;
  nbPages: number;
  nbHits: number;
  hitsPerPage: number;
}
