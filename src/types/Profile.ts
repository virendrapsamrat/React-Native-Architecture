export interface Profile {
  id: string;
  userId: string;
  bio?: string;
  location?: string;
  website?: string;
  followers: number;
  following: number;
  posts: number;
}

export interface ProfileStat {
  label: string;
  value: number;
}
