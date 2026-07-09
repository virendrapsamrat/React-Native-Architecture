import { DemoApiClient } from './api/DemoApiClient';
import { Endpoints } from './api/Endpoints';
import type { ApiResponse, PaginatedResponse } from '@/types/ApiResponse';
import type { Product } from '@/types/Product';

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category: string;
  stock: number;
  rating?: number;
}

interface DummyJsonResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

const mapDummyProductToProduct = (p: DummyJsonProduct): Product => ({
  id: String(p.id),
  name: p.title,
  description: p.description,
  price: p.price,
  imageUrl: p.thumbnail,
  category: p.category,
  inStock: p.stock > 0,
  rating: p.rating,
});

export const ProductService = {
  getProducts: async (page = 1, limit = 20): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const skip = (page - 1) * limit;
    const response = await DemoApiClient.get<DummyJsonResponse>(
      Endpoints.PRODUCTS.LIST,
      { params: { limit, skip } },
    );
    
    const mappedProducts = response.data.products.map(mapDummyProductToProduct);
    const totalPages = Math.ceil(response.data.total / limit);

    return {
      success: true,
      data: {
        data: mappedProducts,
        total: response.data.total,
        page,
        limit,
        totalPages,
      },
    };
  },

  getProduct: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await DemoApiClient.get<DummyJsonProduct>(
      Endpoints.PRODUCTS.DETAIL(id),
    );
    return {
      success: true,
      data: mapDummyProductToProduct(response.data),
    };
  },

  searchProducts: async (query: string): Promise<ApiResponse<Product[]>> => {
    const response = await DemoApiClient.get<DummyJsonResponse>(
      Endpoints.PRODUCTS.SEARCH,
      { params: { q: query } },
    );
    return {
      success: true,
      data: response.data.products.map(mapDummyProductToProduct),
    };
  },

  getCategories: async (): Promise<ApiResponse<string[]>> => {
    interface CategoryItem {
      slug: string;
      name: string;
      url: string;
    }
    const response = await DemoApiClient.get<Array<string | CategoryItem>>('/products/categories');
    let categories: string[] = [];
    if (Array.isArray(response.data)) {
      categories = response.data
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          } else if (item && typeof item === 'object' && typeof item.slug === 'string') {
            return item.slug;
          }
          return '';
        })
        .filter(Boolean);
    }
    return {
      success: true,
      data: categories,
    };
  },

  getProductsByCategory: async (
    categoryName: string,
    page = 1,
    limit = 20,
  ): Promise<ApiResponse<PaginatedResponse<Product>>> => {
    const skip = (page - 1) * limit;
    const response = await DemoApiClient.get<DummyJsonResponse>(
      `/products/category/${categoryName}`,
      { params: { limit, skip } },
    );
    const mappedProducts = response.data.products.map(mapDummyProductToProduct);
    const totalPages = Math.ceil(response.data.total / limit);

    return {
      success: true,
      data: {
        data: mappedProducts,
        total: response.data.total,
        page,
        limit,
        totalPages,
      },
    };
  },
};
