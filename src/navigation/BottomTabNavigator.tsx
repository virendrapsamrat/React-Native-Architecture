import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { SettingsScreen } from '../screens/Settings';
import { RouteNames } from './RouteNames';
import { Icon } from '../components/atoms/Icon';
import { useTheme } from '../theme/ThemeProvider';
import { t } from '../localization/i18n';
import type { BottomTabParamList } from '../types/Navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabItems = [
  {
    name: RouteNames.MAIN.HOME,
    component: HomeScreen,
    iconName: 'House' as const,
    labelKey: 'home.title',
  },
  {
    name: RouteNames.MAIN.PROFILE,
    component: ProfileScreen,
    iconName: 'UserRound' as const,
    labelKey: 'profile.title',
  },
  {
    name: RouteNames.MAIN.SETTINGS,
    component: SettingsScreen,
    iconName: 'Settings' as const,
    labelKey: 'settings.title',
  },
];

export const BottomTabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon',
        tabBarIcon: ({ color, size, focused }) => {
          const tabItem = tabItems.find((item) => item.name === route.name);
          const iconName = tabItem?.iconName ?? 'CircleHelp';
          return <Icon name={iconName} size={size} color={color} strokeWidth={focused ? 2.5 : 1.75} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          paddingBottom: 6,
          paddingTop: 6,
        },
      })}
    >
      {tabItems.map((tabItem) => (
        <Tab.Screen
          key={tabItem.name}
          name={tabItem.name}
          component={tabItem.component}
          options={{
            tabBarLabel: t(tabItem.labelKey),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

