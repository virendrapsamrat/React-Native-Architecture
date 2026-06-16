import React from 'react';
import { View, TextInput } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { useTheme } from '../../../theme/ThemeProvider';
import { searchBarStyles } from './SearchBar.styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
}) => {
  const { theme } = useTheme();

  return (
    <View style={searchBarStyles.container}>
      <Icon name="🔍" size={18} color={theme.colors.textSecondary} />
      <TextInput
        style={[searchBarStyles.input, { color: theme.colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
      />
    </View>
  );
};
