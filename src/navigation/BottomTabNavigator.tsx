import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/Home';
import { ProfileScreen } from '../screens/Profile';
import { SettingsScreen } from '../screens/Settings';
import { RouteNames } from './RouteNames';
import type { BottomTabParamList } from '../types/Navigation';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name={RouteNames.MAIN.HOME} component={HomeScreen} />
    <Tab.Screen name={RouteNames.MAIN.PROFILE} component={ProfileScreen} />
    <Tab.Screen name={RouteNames.MAIN.SETTINGS} component={SettingsScreen} />
  </Tab.Navigator>
);
