import React from 'react';
import { View, Image, Text } from 'react-native';
import { avatarStyles } from './Avatar.styles';
import { useTheme } from '@/theme/ThemeProvider';
import { getInitials } from '@/utils/stringUtils';

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
  const { theme } = useTheme();

  return (
    <View
      style={[
        avatarStyles.container,
        avatarStyles[size],
        { backgroundColor: theme.colors.surface },
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={avatarStyles.image} />
      ) : (
        <Text style={[avatarStyles.initials, { color: theme.colors.primary }]}> 
          {getInitials(firstName, lastName)}
        </Text>
      )}
    </View>
  );
};
