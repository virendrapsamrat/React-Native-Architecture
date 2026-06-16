import ApiClient from './api/ApiClient';
import { Endpoints } from './api/Endpoints';
import type { ApiResponse, PaginatedResponse } from '../types/ApiResponse';
import type { Product } from '../types/Product';

export const ProductService = {
  getProducts: async (page = 1, limit = 20) => {
    const response = await ApiClient.get<ApiResponse<PaginatedResponse<Product>>>(
      Endpoints.PRODUCTS.LIST,
      { params: { page, limit } },
    );
    return response.data;
  },

  getProduct: async (id: string) => {
    const response = await ApiClient.get<ApiResponse<Product>>(
      Endpoints.PRODUCTS.DETAIL(id),
    );
    return response.data;
  },

  searchProducts: async (query: string) => {
    const response = await ApiClient.get<ApiResponse<Product[]>>(
      Endpoints.PRODUCTS.SEARCH,
      { params: { q: query } },
    );
    return response.data;
  },
};
