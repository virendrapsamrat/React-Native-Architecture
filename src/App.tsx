import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from './theme/ThemeProvider';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';
import { ThemeProvider } from './theme/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { AppNavigator } from './navigation/AppNavigator';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <AuthProvider>
        <WithThemedStatusBar />
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);

const WithThemedStatusBar: React.FC = () => {
  const { theme, isDark } = useTheme();

  return <StatusBar style={isDark ? 'light' : 'dark'} />;
};

export default App;
