import { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { Text } from '../../components/atoms/Text';
import { SearchBar } from '../../components/molecules/SearchBar';
import { ProductCard } from '../../components/organisms/ProductCard';
import { Loader } from '../../components/atoms/Loader';
import { useHomeViewModel } from '../../viewModels/HomeViewModel';
import { useDebounce } from '../../hooks/useDebounce';
import { t } from '../../localization/i18n';

export const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const { products, isLoading } = useHomeViewModel(debouncedSearch);

  return (
    <MainTemplate
      header={
        <Text variant="h1" style={styles.header}>
          {t('home.title')}
        </Text>
      }
    >
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder={t('home.searchPlaceholder')}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  header: { paddingBottom: 16 },
  list: { marginTop: 16 },
});
