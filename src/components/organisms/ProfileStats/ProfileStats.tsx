import React from 'react';
import { View } from 'react-native';
import { UserStat } from '@/components/molecules/UserStat';
import { profileStatsStyles } from './ProfileStats.styles';
import type { ProfileStat } from '@/types/Profile';

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => (
  <View style={profileStatsStyles.container}>
    {stats.map((stat) => (
      <UserStat key={stat.label} label={stat.label} value={stat.value} />
    ))}
  </View>
);
