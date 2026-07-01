import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api/queryClient';
import { store } from './store/redux/store';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <WithThemedStatusBar />
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

const WithThemedStatusBar: React.FC = () => {
  const { isDark } = useTheme();

  return <StatusBar style={isDark ? 'light' : 'dark'} />;
};

export default App;
