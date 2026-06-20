import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export type Theme = typeof lightTheme | typeof darkTheme;

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const reduxDarkMode = useAppSelector((state) => state.settings.darkMode);
  
  // Use Redux dark mode if enabled, otherwise use system color scheme
  const isDark = reduxDarkMode || systemColorScheme === 'dark';

  const value = useMemo(
    () => ({
      theme: isDark ? darkTheme : lightTheme,
      isDark,
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
