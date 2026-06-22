import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../../atoms/Text';
import { formatCurrency } from '../../../utils/numberUtils';
import { productCardStyles } from './ProductCard.styles';
import { useTheme } from '../../../theme/ThemeProvider';
import type { Product } from '../../../types/Product';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[productCardStyles.container, { backgroundColor: theme.colors.surface }]}
      onPress={() => onPress?.(product)}
      activeOpacity={0.8}
    >
      {product.imageUrl && (
        <Image
          source={{ uri: product.imageUrl }}
          style={[productCardStyles.image, { backgroundColor: theme.colors.border }]}
        />
      )}
      <View style={productCardStyles.content}>
        <Text variant="h3" style={{ color: theme.colors.text }}>{product.name}</Text>
        <Text variant="caption" numberOfLines={2} style={{ color: theme.colors.textSecondary }}>
          {product.description}
        </Text>
        <View style={productCardStyles.footer}>
          <Text variant="body" style={{ color: theme.colors.text }}>{formatCurrency(product.price)}</Text>
          <Text variant="caption" style={{ color: theme.colors.textSecondary }}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
