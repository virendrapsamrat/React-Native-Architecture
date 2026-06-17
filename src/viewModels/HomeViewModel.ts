import { useState, useEffect } from 'react';
import type { Product } from '../types/Product';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones',
    price: 199.99,
    category: 'Electronics',
    inStock: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor',
    price: 299.99,
    category: 'Electronics',
    inStock: true,
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Lightweight running shoes for all terrains',
    price: 129.99,
    category: 'Sports',
    inStock: false,
    rating: 4.8,
  },
];

export const useHomeViewModel = (searchQuery = '') => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = searchQuery
        ? MOCK_PRODUCTS.filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        : MOCK_PRODUCTS;
      setProducts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return { products, isLoading };
};
