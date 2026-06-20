import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { SettingsScreen } from '../screens/Settings';
import { RouteNames } from './RouteNames';
import { Icon } from '../components/atoms/Icon';
import { Colors } from '../constants/Colors';
import type { BottomTabParamList } from '../types/Navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName = '❓';
        if (route.name === RouteNames.MAIN.HOME) {
          iconName = '🏠';
        } else if (route.name === RouteNames.MAIN.PROFILE) {
          iconName = '👤';
        } else if (route.name === RouteNames.MAIN.SETTINGS) {
          iconName = '⚙️';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.textSecondary,
    })}
  >
    <Tab.Screen name={RouteNames.MAIN.HOME} component={HomeScreen} />
    <Tab.Screen name={RouteNames.MAIN.PROFILE} component={ProfileScreen} />
    <Tab.Screen name={RouteNames.MAIN.SETTINGS} component={SettingsScreen} />
  </Tab.Navigator>
);
