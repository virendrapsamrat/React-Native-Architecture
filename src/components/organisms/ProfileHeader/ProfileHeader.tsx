import React from 'react';
import { View } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { Text } from '../../atoms/Text';
import { profileHeaderStyles } from './ProfileHeader.styles';

interface ProfileHeaderProps {
  name: string;
  bio?: string;
  avatarUri?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  bio,
  avatarUri,
}) => (
  <View style={profileHeaderStyles.container}>
    <Avatar uri={avatarUri} name={name} size="xl" />
    <Text variant="h2" style={profileHeaderStyles.name}>
      {name}
    </Text>
    {bio && (
      <Text variant="body" style={profileHeaderStyles.bio}>
        {bio}
      </Text>
    )}
  </View>
);
