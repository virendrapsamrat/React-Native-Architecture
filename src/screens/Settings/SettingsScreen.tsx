import { View, Switch, StyleSheet } from 'react-native';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { SettingsSection } from '../../components/organisms/SettingsSection';
import { useAuth } from '../../hooks/useAuth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleNotifications, toggleDarkMode } from '../../store/redux/settings/settingsSlice';
import { t } from '../../localization/i18n';
import { useTheme } from '../../theme/ThemeProvider';
import { storageUtils } from '../../utils/storageUtils';
import { Colors } from '../../constants/Colors';

export const SettingsScreen = () => {
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const { notificationsEnabled, darkMode } = useAppSelector((s) => s.settings);
  const { theme } = useTheme();

  return (
    <MainTemplate
      header={
        <Text variant="h1" style={[styles.header, { color: theme.colors.text }]}>
          {t('settings.title')}
        </Text>
      }
    >
      <View>
        <SettingsSection title="Preferences">
        <View style={styles.row}>
          <Text variant="body">{t('settings.notifications')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={() => { dispatch(toggleNotifications()); }}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={Colors.textLight}
          />
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.row}>
          <Text variant="body">{t('settings.darkMode')}</Text>
          <Switch
            value={darkMode}
            onValueChange={() => {
              const nextDarkMode = !darkMode;
              dispatch(toggleDarkMode());
              storageUtils.saveThemeMode(nextDarkMode ? 'dark' : 'light');
            }}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={Colors.textLight}
          />
        </View>
      </SettingsSection>

      <Button
        title={t('settings.logout')}
        onPress={logout}
        variant="outline"
      />
      </View>
    </MainTemplate>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
  },
  header: { marginBottom: 16 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});

