import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api/queryClient';
import { store } from './store/redux/store';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/redux/auth/authSlice';
import { setDarkMode } from './store/redux/settings/settingsSlice';
import { storageUtils } from './utils/storageUtils';
import type { AuthUser } from './types/User';

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AppStartup />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

const AppStartup = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const restoreAppState = async () => {
      const themeMode = await storageUtils.getThemeMode();

      if (themeMode === 'dark') {
        dispatch(setDarkMode(true));
      } else if (themeMode === 'light') {
        dispatch(setDarkMode(false));
      }

      const authToken = await storageUtils.getAuthToken();
      const storedUser = await storageUtils.getUserData<AuthUser>();

      if (authToken && storedUser) {
        dispatch(setUser(storedUser));
      }

      setIsReady(true);
    };

    restoreAppState();
  }, [dispatch]);

  if (!isReady) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <WithThemedStatusBar />
      <AppNavigator />
    </>
  );
};

const WithThemedStatusBar: React.FC = () => {
  const { isDark } = useTheme();

  return <StatusBar style={isDark ? 'light' : 'dark'} />;
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
