import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { Loader } from '../../components/atoms/Loader';
import { Text } from '../../components/atoms/Text';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ProductCard } from '../../components/organisms/ProductCard';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { Colors } from '../../constants/Colors';
import { useDebounce } from '../../hooks/useDebounce';
import { t } from '../../localization/i18n';
import { useTheme } from '../../theme/ThemeProvider';
import { useHomeViewModel } from '../../viewModels/HomeViewModel';

const formatCategoryName = (name: string) => {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const HomeScreen = () => {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const debouncedSearch = useDebounce(search);

  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    isLoading,
    isRefreshing,
    error,
    clearFilters,
    refreshProducts,
  } = useHomeViewModel(debouncedSearch);

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) + (inStockOnly ? 1 : 0) + (sortBy !== 'none' ? 1 : 0);

  const renderFilterPanel = () => {
    if (!showFilterPanel) return null;

    return (
      <View
        style={[
          styles.filterPanel,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.filterSection}>
          <Text
            variant="body"
            style={[
              styles.filterSectionTitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            Sort By
          </Text>
          <View style={styles.sortOptionsRow}>
            {(
              [
                { label: 'Default', value: 'none' },
                { label: 'Price: Low-High', value: 'priceAsc' },
                { label: 'Price: High-Low', value: 'priceDesc' },
                { label: 'Top Rated', value: 'ratingDesc' },
              ] as const
            ).map((opt) => {
              const isActive = sortBy === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => setSortBy(opt.value)}
                  style={[
                    styles.sortPill,
                    isActive ? styles.sortPillActive : styles.sortPillInactive,
                    {
                      borderColor: isActive
                        ? theme.colors.primary
                        : theme.colors.border,
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    variant="caption"
                    style={[
                      styles.sortText,
                      isActive ? styles.sortTextActive : styles.sortTextInactive,
                      !isActive ? { color: theme.colors.text } : null,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={[styles.filterDivider, { backgroundColor: theme.colors.border }]} />

        <View style={styles.stockFilterRow}>
          <View>
            <Text
              variant="body"
              style={[styles.stockText, { color: theme.colors.text }]}
            >
              In Stock Only
            </Text>
            <Text
              variant="caption"
              style={[styles.stockSubtext, { color: theme.colors.textSecondary }]}
            >
              Hide products out of stock
            </Text>
          </View>
          <Switch
            value={inStockOnly}
            onValueChange={setInStockOnly}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={Colors.textLight}
          />
        </View>

        {activeFiltersCount > 0 && (
          <View style={styles.panelActionsRow}>
            <TouchableOpacity
              onPress={() => {
                clearFilters();
                setSearch('');
              }}
              style={styles.clearAllTextBtn}
            >
              <Text
                variant="body"
                style={styles.clearText}
              >
                Reset All Filters
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const renderCategoryList = () => {
    return (
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity
            onPress={() => setSelectedCategory(null)}
            style={[
              styles.categoryPill,
              selectedCategory === null
                ? [styles.categoryPillActive, { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }]
                : [styles.categoryPillInactive, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }],
            ]}
            activeOpacity={0.7}
          >
            <Text
              variant="body"
              style={[
                styles.categoryText,
                selectedCategory === null
                  ? styles.categoryTextActive
                  : [styles.categoryTextInactive, { color: theme.colors.text }],
              ]}
            >
              All Products
            </Text>
          </TouchableOpacity>

          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryPill,
                  isSelected
                    ? [styles.categoryPillActive, { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }]
                    : [styles.categoryPillInactive, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }],
                ]}
                activeOpacity={0.7}
              >
                <Text
                  variant="body"
                  style={[
                    styles.categoryText,
                    isSelected
                      ? styles.categoryTextActive
                      : [styles.categoryTextInactive, { color: theme.colors.text }],
                  ]}
                >
                  {formatCategoryName(category)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="search" size={48} color={theme.colors.textSecondary} />
        <Text
          variant="h2"
          style={[styles.emptyTitle, { color: theme.colors.text }]}
        >
          No Products Found
        </Text>
        <Text
          variant="body"
          style={[styles.emptySub, { color: theme.colors.textSecondary }]}
        >
          {"We couldn't find any products matching your search terms or filters. Try adjusting them or resetting."}
        </Text>
        <Button
          title="Reset Filters"
          onPress={() => {
            clearFilters();
            setSearch('');
          }}
          variant="outline"
          style={styles.resetButton}
        />
      </View>
    );
  };

  return (
    <MainTemplate
      header={
        <Text variant="h1" style={styles.header}>
          {t('home.title')}
        </Text>
      }
    >
      <View style={styles.searchRow}>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder={t('home.searchPlaceholder')}
          />
        </View>
        <TouchableOpacity
          onPress={() => setShowFilterPanel(!showFilterPanel)}
          style={[
            styles.filterToggleBtn,
            showFilterPanel || activeFiltersCount > 0
              ? [styles.filterToggleBtnActive, { backgroundColor: theme.colors.primary }]
              : [styles.filterToggleBtnInactive, { backgroundColor: theme.colors.surface }],
            { borderColor: theme.colors.border },
          ]}
          activeOpacity={0.8}
        >
          <Icon
            name="SlidersHorizontal"
            size={18}
            color={
              showFilterPanel || activeFiltersCount > 0
                ? Colors.textLight
                : theme.colors.textSecondary
            }
          />
          {activeFiltersCount > 0 && !showFilterPanel && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{activeFiltersCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {renderFilterPanel()}

      {renderCategoryList()}

      {error ? (
        <View style={styles.errorContainer}>
          <Text
            variant="body"
            style={[styles.errorText, { color: theme.colors.error }]}
          >
            {error}
          </Text>
          <Button
            title="Retry"
            onPress={() => refreshProducts()}
            variant="outline"
          />
        </View>
      ) : isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={refreshProducts}
          contentContainerStyle={styles.listContent}
        />
      )}
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: Colors.error,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: -4,
    top: -4,
    width: 18,
  },
  badgeText: {
    color: Colors.textLight,
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoriesContainer: {
    marginVertical: 8,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 16,
  },
  categoryPill: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryPillActive: {},
  categoryPillInactive: {},
  categoryText: {
    fontSize: 14,
  },
  categoryTextActive: {
    color: Colors.textLight,
    fontWeight: '600',
  },
  categoryTextInactive: {},
  clearAllTextBtn: {
    paddingVertical: 4,
  },
  clearText: {
    color: Colors.error,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  emptySub: {
    lineHeight: 20,
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyTitle: {
    marginBottom: 8,
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  errorText: {
    marginBottom: 12,
    textAlign: 'center',
  },
  filterDivider: {
    height: 1,
    marginVertical: 10,
  },
  filterPanel: {
    borderRadius: 8,
    borderWidth: 1,
    elevation: 2,
    marginBottom: 12,
    padding: 12,
    shadowColor: Colors.text,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterSection: {
    marginBottom: 8,
  },
  filterSectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  filterToggleBtn: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    position: 'relative',
    width: 44,
  },
  filterToggleBtnActive: {},
  filterToggleBtnInactive: {},
  header: {
    paddingBottom: 16,
  },
  list: {
    flex: 1,
    marginTop: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  panelActionsRow: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  resetButton: {
    minWidth: 150,
  },
  searchBarWrapper: {
    flex: 1,
    marginRight: 8,
  },
  searchRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  sortOptionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortPill: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sortPillActive: {
    backgroundColor: Colors.primary,
  },
  sortPillInactive: {
    backgroundColor: Colors.transparent,
  },
  sortText: {
    fontSize: 12,
  },
  sortTextActive: {
    color: Colors.textLight,
    fontWeight: '600',
  },
  sortTextInactive: {},
  stockFilterRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockSubtext: {},
  stockText: {
    fontWeight: '500',
  },
});
