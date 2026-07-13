import React from 'react';
import { View } from 'react-native';
import { Avatar } from '@/components/atoms/Avatar';
import { Text } from '@/components/atoms/Text';
import { useTheme } from '@/theme/ThemeProvider';
import { profileInfoStyles } from './ProfileInfo.styles';

interface ProfileInfoProps {
  name: string;
  email: string;
  avatarUri?: string;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  avatarUri,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        profileInfoStyles.container,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
      ]}
    >
      <Avatar uri={avatarUri} name={name} size="lg" />
      <View style={profileInfoStyles.info}>
        <Text variant="h3" numberOfLines={1}>{name}</Text>
        <Text variant="caption" color={theme.colors.textSecondary} numberOfLines={1}>
          {email}
        </Text>
      </View>
    </View>
  );
};
