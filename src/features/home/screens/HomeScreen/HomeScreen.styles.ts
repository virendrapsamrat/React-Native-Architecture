import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const styles = StyleSheet.create({
  authorRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    borderRadius: 14,
    borderWidth: 1,
    elevation: 2,
    padding: 16,
    shadowColor: Colors.text,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardFooter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 6,
  },
  cardMeta: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22,
  },
  cardWrapper: {
    marginBottom: 10,
    marginHorizontal: 16,
  },
  divider: {
    height: 1,
    marginBottom: 12,
    marginTop: 4,
  },
  domainText: {
    flex: 1,
    fontSize: 11,
    marginLeft: 6,
  },
  dot: {
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptySub: {
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  footerLoader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 13,
  },
  headerSub: {
    fontSize: 12,
    marginTop: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0,
  },
  hnBadge: {
    alignItems: 'center',
    borderRadius: 10,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  hnBadgeText: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '800',
  },
  listContent: {
    paddingBottom: 40,
  },
  listHeader: {
    paddingBottom: 4,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  metaText: {
    fontSize: 12,
  },
  pointsBadge: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '700',
  },
  retryBtn: {
    borderRadius: 10,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  retryBtnText: {
    color: Colors.textLight,
    fontWeight: '700',
  },
  root: {
    flex: 1,
  },
  searchBox: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
  },
  skeleton: {
    borderRadius: 14,
    height: 110,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  sortChip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  sortRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
    marginTop: 8,
  },
  storyContent: {
    padding: 18,
    paddingBottom: 28,
  },
  storyContentFrame: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
  },
  storyDetailTitle: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 18,
  },
  storyLinkButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    paddingLeft: 12,
    paddingRight: 8,
    paddingVertical: 8,
  },
  storyLinkCopyTarget: {
    flex: 1,
    paddingVertical: 4,
  },
  storyLinkIconButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  storyLinkText: {
    fontSize: 14,
    lineHeight: 20,
  },
  storyMetaGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  storyMetaItem: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 12,
  },
  storyMetaLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  storyMetaValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  storyModalClose: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  storyModalDomain: {
    fontSize: 12,
    marginTop: 2,
  },
  storyModalHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  storyModalRoot: {
    flex: 1,
  },
  storyModalShell: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  storyModalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  storyModalTitleWrap: {
    flex: 1,
  },
  storySection: {
    marginBottom: 18,
  },
  storySectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  storySectionValue: {
    fontSize: 15,
    lineHeight: 22,
  },
  storyTag: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  storyTagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  storyTagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tagBadge: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagBadgeText: {
    color: Colors.textLight,
    fontSize: 10,
    fontWeight: '700',
  },
  tagEmoji: {
    fontSize: 13,
    marginRight: 4,
  },
  tagPill: {
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  tagPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  tagRow: {
    gap: 8,
    paddingBottom: 2,
    paddingRight: 8,
  },
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
