import settingsReducer, { setThemeMode } from '@/store/redux/settings/settingsSlice';

describe('settings slice theme mode', () => {
  it('defaults to system theme mode', () => {
    const state = settingsReducer(undefined, { type: '@@INIT' });

    expect(state.themeMode).toBe('system');
  });

  it('stores an explicit light theme mode', () => {
    const state = settingsReducer(
      {
        language: 'en',
        notificationsEnabled: true,
        darkMode: false,
        themeMode: 'system',
      },
      setThemeMode('light'),
    );

    expect(state.themeMode).toBe('light');
    expect(state.darkMode).toBe(false);
  });
});
