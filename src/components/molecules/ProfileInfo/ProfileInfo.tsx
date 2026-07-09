import React from 'react';
import { View } from 'react-native';
import { Avatar } from '@/components/atoms/Avatar';
import { Text } from '@/components/atoms/Text';
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
}) => (
  <View style={profileInfoStyles.container}>
    <Avatar uri={avatarUri} name={name} size="lg" />
    <View style={profileInfoStyles.info}>
      <Text variant="h3">{name}</Text>
      <Text variant="caption">{email}</Text>
    </View>
  </View>
);
