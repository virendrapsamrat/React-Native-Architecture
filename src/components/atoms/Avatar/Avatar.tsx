import React from 'react';
import { View, Image, Text } from 'react-native';
import { avatarStyles } from './Avatar.styles';
import { getInitials } from '../../../utils/stringUtils';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: AvatarSize;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name = '',
  size = 'md',
}) => {
  const [firstName, lastName] = name.split(' ');

  return (
    <View style={[avatarStyles.container, avatarStyles[size]]}>
      {uri ? (
        <Image source={{ uri }} style={avatarStyles.image} />
      ) : (
        <Text style={avatarStyles.initials}>
          {getInitials(firstName, lastName)}
        </Text>
      )}
    </View>
  );
};
