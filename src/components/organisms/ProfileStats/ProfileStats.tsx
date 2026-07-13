import React from 'react';
import { View } from 'react-native';
import { UserStat } from '@/components/molecules/UserStat';
import { useTheme } from '@/theme/ThemeProvider';
import { profileStatsStyles } from './ProfileStats.styles';
import type { ProfileStat } from '@/types/Profile';

interface ProfileStatsProps {
  stats: ProfileStat[];
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        profileStatsStyles.container,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}
    >
      {stats.map((stat) => (
        <UserStat key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </View>
  );
};
