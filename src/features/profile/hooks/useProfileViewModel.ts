import { useAppSelector } from '@/store/hooks';
import { t } from '@/localization/i18n';
import type { ProfileStat } from '@/types/Profile';

export const useProfileViewModel = () => {
  const { user } = useAppSelector((s) => s.auth);
  const { profile } = useAppSelector((s) => s.profile);

  const stats: ProfileStat[] = [
    { label: t('profile.followers'), value: profile?.followers ?? 0 },
    { label: t('profile.following'), value: profile?.following ?? 0 },
    { label: t('profile.posts'), value: profile?.posts ?? 0 },
  ];

  return {
    user,
    profile,
    stats,
    isLoading: false,
  };
};
