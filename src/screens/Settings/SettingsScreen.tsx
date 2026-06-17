import { View, Switch, StyleSheet } from 'react-native';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { SettingsSection } from '../../components/organisms/SettingsSection';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleNotifications, toggleDarkMode } from '../../store/redux/settings/settingsSlice';
import { t } from '../../localization/i18n';

export const SettingsScreen = () => {
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const { notificationsEnabled, darkMode } = useAppSelector((s) => s.settings);

  return (
    <MainTemplate
      header={
        <Text variant="h1" style={styles.header}>
          {t('settings.title')}
        </Text>
      }
    >
      <SettingsSection title="Preferences">
        <View style={styles.row}>
          <Text variant="body">{t('settings.notifications')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => { dispatch(toggleNotifications()); }}
          />
        </View>
        <View style={styles.row}>
          <Text variant="body">{t('settings.darkMode')}</Text>
          <Switch
            value={darkMode}
            onValueChange={() => { dispatch(toggleDarkMode()); }}
          />
        </View>
      </SettingsSection>

      <Button title={t('settings.logout')} onPress={logout} variant="outline" />
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  header: { marginBottom: 16 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
