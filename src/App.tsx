import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View, LogBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './services/api/queryClient';
import { store } from './store/redux/store';
import { ThemeProvider } from './theme/ThemeProvider';
import { AppNavigator } from './navigation/AppNavigator';
import { useAppDispatch } from './store/hooks';
import { logoutUser, setSession } from './features/auth';
import { setLanguage, setThemeMode } from './store/redux/settings/settingsSlice';
import { storageUtils } from './utils/storageUtils';
import { logoutCoordinator } from './utils/logoutCoordinator';
import { setLocale } from './localization/i18n';
import type { User } from './types/User';

if (__DEV__ && process.env.EXPO_PUBLIC_IGNORE_LOGBOX === 'true') {
  LogBox.ignoreAllLogs(true);
}
const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppStartup />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

const AppStartup = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unregisterLogoutHandler = logoutCoordinator.registerHandler(() => {
      dispatch(logoutUser());
    });

    const restoreAppState = async () => {
      const storedThemeMode = await storageUtils.getThemeMode();
      const themeMode = storedThemeMode ?? 'system';
      dispatch(setThemeMode(themeMode));

      const storedLanguage = await storageUtils.getLanguage();
      if (storedLanguage) {
        dispatch(setLanguage(storedLanguage));
        setLocale(storedLanguage);
      }

      const authToken = await storageUtils.getAuthToken();
      const refreshToken = await storageUtils.getRefreshToken();
      const storedUser = await storageUtils.getUserData<User>();

      if (authToken && storedUser) {
        dispatch(setSession({ user: storedUser, token: authToken, refreshToken }));
      }

      setIsReady(true);
    };

    restoreAppState();

    return () => {
      unregisterLogoutHandler();
    };
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
