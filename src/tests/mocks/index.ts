import { StyleSheet } from 'react-native';

export const testMocks = {
  user: {
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
};

export const mockStore = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
};
