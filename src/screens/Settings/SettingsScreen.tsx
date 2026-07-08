import { View, Switch, StyleSheet, Pressable } from 'react-native';
import { MainTemplate } from '../../components/templates/MainTemplate';
import { Text } from '../../components/atoms/Text';
import { Button } from '../../components/atoms/Button';
import { SettingsSection } from '../../components/organisms/SettingsSection';
import { useAuth } from '../../features/auth';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLanguage, setThemeMode, toggleNotifications } from '../../store/redux/settings/settingsSlice';
import { t, setLocale } from '../../localization/i18n';
import { useTheme } from '../../theme/ThemeProvider';
import { storageUtils } from '../../utils/storageUtils';
import { Colors } from '../../constants/Colors';
import { AppConstants } from '../../constants/AppConstants';

export const SettingsScreen = () => {
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const { notificationsEnabled, themeMode, language } = useAppSelector((s) => s.settings);
  const { theme } = useTheme();

  const handleLanguageChange = (nextLanguage: string) => {
    dispatch(setLanguage(nextLanguage));
    setLocale(nextLanguage);
    storageUtils.saveLanguage(nextLanguage);
  };

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
            value={themeMode === 'dark'}
            onValueChange={(value) => {
              const nextMode = value ? 'dark' : 'light';
              dispatch(setThemeMode(nextMode));
              storageUtils.saveThemeMode(nextMode);
            }}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={Colors.textLight}
          />
        </View>
        <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
        <View style={styles.row}>
          <Text variant="body">{t('settings.language')}</Text>
          <View style={styles.languageOptions}>
            {AppConstants.SUPPORTED_LANGUAGES.filter((locale) => locale !== 'hi' && locale !== 'te').map((locale) => {
              const isActive = language === locale;
              const label = locale === 'en' ? 'English' : 'Español';
              return (
                <Pressable
                  key={locale}
                  onPress={() => handleLanguageChange(locale)}
                  style={[styles.languageChip, isActive && styles.languageChipActive, { borderColor: theme.colors.primary }]}
                >
                  <Text variant="body" style={{ color: isActive ? theme.colors.primary : theme.colors.text }}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
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
  languageChip: {
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  languageChipActive: {
    backgroundColor: Colors.surface,
  },
  languageOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
