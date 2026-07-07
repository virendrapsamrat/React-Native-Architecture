import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../features/auth/screens/LoginScreen';
import { SignupScreen } from '../features/auth/screens/SignupScreen';
import { RouteNames } from './RouteNames';
import type { AuthStackParamList } from '../types/Navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name={RouteNames.AUTH.LOGIN} component={LoginScreen} />
    <Stack.Screen name={RouteNames.AUTH.SIGNUP} component={SignupScreen} />
  </Stack.Navigator>
);
