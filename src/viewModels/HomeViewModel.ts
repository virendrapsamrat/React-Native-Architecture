import { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductService } from '../services/ProductService';
import type { Product } from '../types/Product';

export const useHomeViewModel = (searchQuery = '') => {
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'none' | 'priceAsc' | 'priceDesc' | 'ratingDesc'>('none');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories once on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ProductService.getCategories();
        if (response.success && response.data) {
          setCategories(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      let fetchedProducts: Product[] = [];

      if (searchQuery.trim().length > 0) {
        // If there's a search query, fetch using search API
        const response = await ProductService.searchProducts(searchQuery);
        if (response.success && response.data) {
          fetchedProducts = response.data;
          // Apply category filter client side if category is selected
          if (selectedCategory) {
            fetchedProducts = fetchedProducts.filter(
              (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
          }
        }
      } else if (selectedCategory) {
        // Fetch products by category
        const response = await ProductService.getProductsByCategory(selectedCategory, 1, 100);
        if (response.success && response.data) {
          fetchedProducts = response.data.data;
        }
      } else {
        // Fetch all products
        const response = await ProductService.getProducts(1, 100);
        if (response.success && response.data) {
          fetchedProducts = response.data.data;
        }
      }

      setRawProducts(fetchedProducts);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(errorMessage);
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [searchQuery, selectedCategory]);

  // Refetch products when searchQuery or selectedCategory changes
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  // Compute filtered and sorted products locally
  const products = useMemo(() => {
    let result = [...rawProducts];

    // Filter by stock status
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Apply sorting
    if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'ratingDesc') {
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    return result;
  }, [rawProducts, inStockOnly, sortBy]);

  const clearFilters = useCallback(() => {
    setSelectedCategory(null);
    setInStockOnly(false);
    setSortBy('none');
  }, []);

  const handleRefresh = useCallback(() => {
    fetchProducts(true);
  }, [fetchProducts]);

  return {
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
    refreshProducts: handleRefresh,
  };
};
