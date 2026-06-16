import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../../atoms/Text';
import { formatCurrency } from '../../../utils/numberUtils';
import { productCardStyles } from './ProductCard.styles';
import type { Product } from '../../../types/Product';

interface ProductCardProps {
  product: Product;
  onPress?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <TouchableOpacity
    style={productCardStyles.container}
    onPress={() => onPress?.(product)}
    activeOpacity={0.8}
  >
    {product.imageUrl && (
      <Image source={{ uri: product.imageUrl }} style={productCardStyles.image} />
    )}
    <View style={productCardStyles.content}>
      <Text variant="h3">{product.name}</Text>
      <Text variant="caption" numberOfLines={2}>
        {product.description}
      </Text>
      <View style={productCardStyles.footer}>
        <Text variant="body">{formatCurrency(product.price)}</Text>
        <Text variant="caption">{product.inStock ? 'In Stock' : 'Out of Stock'}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
