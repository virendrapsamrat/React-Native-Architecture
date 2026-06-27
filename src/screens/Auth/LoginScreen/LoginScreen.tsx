import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormField } from '../../../components/molecules/FormField';
import { Button } from '../../../components/atoms/Button';
import { Text } from '../../../components/atoms/Text';
import { MainTemplate } from '../../../components/templates/MainTemplate';
import { useAuthViewModel } from '../../../viewModels/AuthViewModel';
import { t } from '../../../localization/i18n';
import { Colors } from '../../../constants/Colors';
import { TestIds } from '../../../constants/TestIds';
import type { AuthStackParamList } from '../../../types/Navigation';

export const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { login, isLoading, error } = useAuthViewModel();
  // Test credentials pre-filled for development
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Password123');

  const handleLogin = () => login(email, password);

  return (
    <MainTemplate>
      <View testID={TestIds.AUTH.LOGIN_SCREEN}>
        <Text variant="h1" style={styles.title}>
          {t('auth.login')}
        </Text>
        <FormField
          testID={TestIds.AUTH.EMAIL_INPUT}
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormField
          testID={TestIds.AUTH.PASSWORD_INPUT}
          label={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error && (
          <Text variant="caption" style={styles.error}>
            {error}
          </Text>
        )}
        <Button
          testID={TestIds.AUTH.SUBMIT_BUTTON}
          title={t('auth.login')}
          onPress={handleLogin}
          loading={isLoading}
          style={styles.button}
        />
        <View style={styles.footer}>
          <Text variant="body">{t('auth.noAccount')} </Text>
          <Text
            testID={TestIds.AUTH.SIGNUP_LINK}
            variant="body"
            style={styles.link}
            onPress={() => navigation.navigate('Signup')}
          >
            {t('auth.signup')}
          </Text>
        </View>
      </View>
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  button: { marginTop: 8 },
  error: { color: Colors.error, marginBottom: 8 },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
  link: { color: Colors.primary },
  title: { marginBottom: 24 },
});
