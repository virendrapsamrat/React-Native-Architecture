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
import type { AuthStackParamList } from '../../../types/Navigation';

export const SignupScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const { signup, isLoading, error } = useAuthViewModel();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => signup({ firstName, lastName, email, password });

  return (
    <MainTemplate>
      <Text variant="h1" style={styles.title}>
        {t('auth.signup')}
      </Text>
      <FormField label="First Name" value={firstName} onChangeText={setFirstName} />
      <FormField label="Last Name" value={lastName} onChangeText={setLastName} />
      <FormField
        label={t('auth.email')}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <FormField
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
        title={t('auth.signup')}
        onPress={handleSignup}
        loading={isLoading}
        style={styles.button}
      />
      <View style={styles.footer}>
        <Text variant="body">{t('auth.hasAccount')} </Text>
        <Text
          variant="body"
          style={styles.link}
          onPress={() => navigation.navigate('Login')}
        >
          {t('auth.login')}
        </Text>
      </View>
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  title: { marginBottom: 24 },
  button: { marginTop: 8 },
  error: { color: 'red', marginBottom: 8 },
  footer: { flexDirection: 'row', marginTop: 16, justifyContent: 'center' },
  link: { color: '#4F46E5' },
});
