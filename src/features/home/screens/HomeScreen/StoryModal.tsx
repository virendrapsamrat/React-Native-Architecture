import React, { useCallback } from 'react';
import { Linking, Modal, Pressable, SafeAreaView, ScrollView, View } from 'react-native';
import { Icon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { Colors } from '@/constants/Colors';
import type { Theme } from '@/theme/ThemeProvider';
import type { HNHit } from '@/types/HNStory';
import { getDiscussionUrl, getDomain, getStoryUrl, timeAgo } from './HomeScreen.helpers';
import { styles } from './HomeScreen.styles';

interface StoryModalProps {
  story: HNHit | null;
  theme: Theme;
  onClose: () => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({ story, theme, onClose }) => {
  const storyUrl = story ? getStoryUrl(story) : null;
  const discussionUrl = story ? getDiscussionUrl(story) : null;
  const domain = getDomain(storyUrl);

  const openLink = useCallback((url: string) => {
    Linking.openURL(url).catch(() => null);
  }, []);

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="fullScreen"
      visible={story !== null}
    >
      <SafeAreaView style={[styles.storyModalRoot, { backgroundColor: theme.colors.background }]}>
        <View style={styles.storyModalShell}>
          <View style={styles.storyModalHeader}>
            <View style={styles.storyModalTitleWrap}>
              <Text style={[styles.storyModalTitle, { color: theme.colors.text }]} numberOfLines={1}>
                {story?.title ?? 'Story'}
              </Text>
              {domain !== null && (
                <Text style={[styles.storyModalDomain, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                  {domain}
                </Text>
              )}
            </View>
            <Pressable
              accessibilityLabel="Close story"
              accessibilityRole="button"
              onPress={onClose}
              style={[styles.storyModalClose, { borderColor: theme.colors.border }]}
            >
              <Icon name="X" size={22} color={theme.colors.text} />
            </Pressable>
          </View>

          <View
            style={[
              styles.storyContentFrame,
              { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
            ]}
          >
            <ScrollView contentContainerStyle={styles.storyContent} showsVerticalScrollIndicator={false}>
              <Text style={[styles.storyDetailTitle, { color: theme.colors.text }]}>
                {story?.title ?? 'Story'}
              </Text>

              <View style={styles.storyMetaGrid}>
                <View style={[styles.storyMetaItem, { borderColor: theme.colors.border }]}>
                  <Text style={[styles.storyMetaLabel, { color: theme.colors.textSecondary }]}>Points</Text>
                  <Text style={[styles.storyMetaValue, { color: theme.colors.text }]}>{story?.points ?? 0}</Text>
                </View>
                <View style={[styles.storyMetaItem, { borderColor: theme.colors.border }]}>
                  <Text style={[styles.storyMetaLabel, { color: theme.colors.textSecondary }]}>Comments</Text>
                  <Text style={[styles.storyMetaValue, { color: theme.colors.text }]}>
                    {story?.num_comments ?? 0}
                  </Text>
                </View>
              </View>

              <View style={styles.storySection}>
                <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Author</Text>
                <Text style={[styles.storySectionValue, { color: theme.colors.text }]}>
                  {story?.author ?? 'Unknown'}
                </Text>
              </View>

              <View style={styles.storySection}>
                <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Published</Text>
                <Text style={[styles.storySectionValue, { color: theme.colors.text }]}>
                  {story ? timeAgo(story.created_at) : ''}
                </Text>
              </View>

              {domain !== null && (
                <View style={styles.storySection}>
                  <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Source</Text>
                  <Text style={[styles.storySectionValue, { color: theme.colors.text }]}>{domain}</Text>
                </View>
              )}

              {story?._tags?.length ? (
                <View style={styles.storySection}>
                  <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>Tags</Text>
                  <View style={styles.storyTagList}>
                    {story._tags.map((tag) => (
                      <View key={tag} style={[styles.storyTag, { borderColor: theme.colors.border }]}>
                        <Text style={[styles.storyTagText, { color: theme.colors.textSecondary }]}>{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ) : null}

              {storyUrl !== null && (
                <StoryLink
                  label="Story URL"
                  url={storyUrl}
                  accessibilityLabel="Open story link in browser"
                  theme={theme}
                  onOpen={openLink}
                />
              )}

              {discussionUrl !== null && (
                <StoryLink
                  label="HN Discussion"
                  url={discussionUrl}
                  accessibilityLabel="Open discussion link in browser"
                  theme={theme}
                  onOpen={openLink}
                />
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

interface StoryLinkProps {
  label: string;
  url: string;
  accessibilityLabel: string;
  theme: Theme;
  onOpen: (url: string) => void;
}

const StoryLink: React.FC<StoryLinkProps> = ({ label, url, accessibilityLabel, theme, onOpen }) => (
  <View style={styles.storySection}>
    <Text style={[styles.storySectionLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
    <View style={[styles.storyLinkButton, { borderColor: theme.colors.border }]}>
      <View style={styles.storyLinkCopyTarget}>
        <Text selectable style={[styles.storyLinkText, { color: Colors.primary }]} numberOfLines={2}>
          {url}
        </Text>
      </View>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="link"
        onPress={() => onOpen(url)}
        style={styles.storyLinkIconButton}
      >
        <Icon name="ExternalLink" size={18} color={Colors.primary} />
      </Pressable>
    </View>
  </View>
);
