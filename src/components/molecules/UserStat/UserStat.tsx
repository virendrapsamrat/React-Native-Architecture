import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { formatNumber } from '@/utils/numberUtils';
import { useUserStatStyles } from './UserStat.styles';

interface UserStatProps {
  label: string;
  value: number;
}

export const UserStat: React.FC<UserStatProps> = ({ label, value }) => {
  const styles = useUserStatStyles();

  return (
    <View style={styles.container}>
      <Text variant="h3" style={styles.value}>
        {formatNumber(value)}
      </Text>
      <Text variant="caption" style={styles.label}>
        {label}
      </Text>
    </View>
  );
};
