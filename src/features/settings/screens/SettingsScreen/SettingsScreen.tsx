import { useState } from 'react';
import { View, Switch, StyleSheet, Pressable, Modal } from 'react-native';
import { MainTemplate } from '../../../../components/templates/MainTemplate';
import { Text } from '../../../../components/atoms/Text';
import { Button } from '../../../../components/atoms/Button';
import { SettingsSection } from '../../../../components/organisms/SettingsSection';
import { useAuth } from '../../../auth';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { setLanguage, setThemeMode, toggleNotifications } from '../../../../store/redux/settings/settingsSlice';
import { t, tForLocale, setLocale } from '../../../../localization/i18n';
import { useTheme } from '../../../../theme/ThemeProvider';
import { storageUtils } from '../../../../utils/storageUtils';
import { Colors } from '../../../../constants/Colors';
import { AppConstants } from '../../../../constants/AppConstants';

export const SettingsScreen = () => {
  const { logout } = useAuth();
  const dispatch = useAppDispatch();
  const { notificationsEnabled, themeMode, language } = useAppSelector((s) => s.settings);
  const { theme } = useTheme();
  const [pendingLanguage, setPendingLanguage] = useState<string | null>(null);

  const getLanguageLabel = (locale: string) => (locale === 'en' ? 'English' : 'Español');
  const modalT = (key: string) => pendingLanguage ? tForLocale(pendingLanguage, key) : t(key);

  const requestLanguageChange = (nextLanguage: string) => {
    if (nextLanguage === language) return;
    setPendingLanguage(nextLanguage);
  };

  const confirmLanguageChange = () => {
    if (!pendingLanguage) return;
    const nextLanguage = pendingLanguage;
    setLocale(nextLanguage);
    dispatch(setLanguage(nextLanguage));
    storageUtils.saveLanguage(nextLanguage);
    setPendingLanguage(null);
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
                  onPress={() => requestLanguageChange(locale)}
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

      <Modal
        animationType="fade"
        transparent
        visible={pendingLanguage !== null}
        onRequestClose={() => setPendingLanguage(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <Text variant="h3" style={styles.modalTitle}>
              {modalT('settings.confirmLanguageTitle')}
            </Text>
            <Text variant="body" style={styles.modalMessage}>
              {`${modalT('settings.confirmLanguageMessage')} ${pendingLanguage ? getLanguageLabel(pendingLanguage) : ''}?`}
            </Text>
            <View style={styles.modalActions}>
              <Button
                title={modalT('common.cancel')}
                onPress={() => setPendingLanguage(null)}
                variant="outline"
                style={styles.modalButton}
              />
              <Button
                title={modalT('common.reload')}
                onPress={confirmLanguageChange}
                style={styles.modalButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: Colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  modalButton: {
    minWidth: 104,
  },
  modalContent: {
    borderRadius: 8,
    padding: 20,
    width: '100%',
  },
  modalMessage: {
    marginBottom: 20,
  },
  modalTitle: {
    marginBottom: 8,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
