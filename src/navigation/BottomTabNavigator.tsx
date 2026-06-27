import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { SettingsScreen } from '../screens/Settings';
import { RouteNames } from './RouteNames';
import { TestIds } from '../constants/TestIds';
import { Icon } from '../components/atoms/Icon';
import { useTheme } from '../theme/ThemeProvider';
import type { BottomTabParamList } from '../types/Navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName = 'CircleHelp';
          if (route.name === RouteNames.MAIN.HOME) {
            iconName = focused ? 'House' : 'House';
          } else if (route.name === RouteNames.MAIN.PROFILE) {
            iconName = focused ? 'UserRound' : 'UserRound';
          } else if (route.name === RouteNames.MAIN.SETTINGS) {
            iconName = focused ? 'Settings' : 'Settings';
          }
          return <Icon name={iconName} size={size} color={color} strokeWidth={focused ? 2.5 : 1.75} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
        },
      })}
    >
      <Tab.Screen
        name={RouteNames.MAIN.HOME}
        component={HomeScreen}
        options={{ tabBarButtonTestID: TestIds.MAIN.HOME_TAB }}
      />
      <Tab.Screen
        name={RouteNames.MAIN.PROFILE}
        component={ProfileScreen}
        options={{ tabBarButtonTestID: TestIds.MAIN.PROFILE_TAB }}
      />
      <Tab.Screen
        name={RouteNames.MAIN.SETTINGS}
        component={SettingsScreen}
        options={{ tabBarButtonTestID: TestIds.MAIN.SETTINGS_TAB }}
      />
    </Tab.Navigator>
  );
};

