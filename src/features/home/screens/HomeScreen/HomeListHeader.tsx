import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';
import type { SortOption } from '@/features/home/hooks/useHomeViewModel';
import type { Theme } from '@/theme/ThemeProvider';
import type { HNStoryTag } from '@/types/HNStory';
import { SORT_OPTIONS, TAG_OPTIONS } from './HomeScreen.helpers';
import { styles } from './HomeScreen.styles';

interface HomeListHeaderProps {
  theme: Theme;
  searchText: string;
  selectedTag: HNStoryTag;
  sortBy: SortOption;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTag: (tag: HNStoryTag) => void;
  setSortBy: (sort: SortOption) => void;
}

export const HomeListHeader: React.FC<HomeListHeaderProps> = ({
  theme,
  searchText,
  selectedTag,
  sortBy,
  setSearchText,
  setSelectedTag,
  setSortBy,
}) => (
  <View style={styles.listHeader}>
    <View style={styles.titleRow}>
      <View>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Hacker News</Text>
        <Text style={[styles.headerSub, { color: theme.colors.textSecondary }]}>Top tech stories, updated live</Text>
      </View>
      <View style={[styles.hnBadge, { backgroundColor: Colors.warning }]}>
        <Text style={styles.hnBadgeText}>HN</Text>
      </View>
    </View>

    <View style={[styles.searchBox, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        style={[styles.searchInput, { color: theme.colors.text }]}
        placeholder="Search stories..."
        placeholderTextColor={theme.colors.textSecondary}
        value={searchText}
        onChangeText={setSearchText}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
    </View>

    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tagRow}>
      {TAG_OPTIONS.map((tag) => {
        const active = selectedTag === tag.value;
        return (
          <TouchableOpacity
            key={tag.value}
            onPress={() => setSelectedTag(tag.value)}
            activeOpacity={0.75}
            style={[
              styles.tagPill,
              active
                ? { backgroundColor: Colors.primary, borderColor: Colors.primary }
                : { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <Text style={styles.tagEmoji}>{tag.emoji}</Text>
            <Text style={[styles.tagPillText, { color: active ? Colors.textLight : theme.colors.textSecondary }]}>
              {tag.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>

    <View style={styles.sortRow}>
      <Text style={[styles.sortLabel, { color: theme.colors.textSecondary }]}>Sort:</Text>
      {SORT_OPTIONS.map((sort) => {
        const active = sortBy === sort.value;
        return (
          <TouchableOpacity
            key={sort.value}
            onPress={() => setSortBy(sort.value)}
            activeOpacity={0.75}
            style={[
              styles.sortChip,
              active
                ? { backgroundColor: `${Colors.primary}20`, borderColor: Colors.primary }
                : { borderColor: theme.colors.border },
            ]}
          >
            <Text style={[styles.sortChipText, { color: active ? Colors.primary : theme.colors.textSecondary }]}>
              {sort.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
  </View>
);
