import { ProfileTemplate } from '../../components/templates/ProfileTemplate';
import { ProfileHeader } from '../../components/organisms/ProfileHeader';
import { ProfileStats } from '../../components/organisms/ProfileStats';
import { ProfileInfo } from '../../components/molecules/ProfileInfo';
import { Loader } from '../../components/atoms/Loader';
import { useProfileViewModel } from '../../viewModels/ProfileViewModel';
import { t } from '../../localization/i18n';

export const ProfileScreen = () => {
  const { profile, user, stats, isLoading } = useProfileViewModel();

  if (isLoading) return <Loader />;

  return (
    <ProfileTemplate
      header={
        <ProfileHeader
          name={user?.firstName ? `${user.firstName} ${user.lastName}` : 'User'}
          bio={profile?.bio}
          avatarUri={user?.avatar}
        />
      }
      stats={<ProfileStats stats={stats} />}
    >
      {user && (
        <ProfileInfo
          name={`${user.firstName} ${user.lastName}`}
          email={user.email}
          avatarUri={user.avatar}
        />
      )}
    </ProfileTemplate>
  );
};
