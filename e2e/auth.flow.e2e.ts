import { TestIds } from '../src/constants/TestIds';
import { testMocks } from '../src/tests/mocks';

describe('Auth flow', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('shows the login screen on launch', async () => {
    await expect(element(by.id(TestIds.AUTH.LOGIN_SCREEN))).toBeVisible();
    await expect(element(by.id(TestIds.AUTH.SUBMIT_BUTTON))).toBeVisible();
  });

  it('logs in with test credentials and reaches the home tab', async () => {
    await element(by.id(TestIds.AUTH.EMAIL_INPUT)).replaceText(testMocks.credentials.email);
    await element(by.id(TestIds.AUTH.PASSWORD_INPUT)).replaceText(testMocks.credentials.password);
    await element(by.id(TestIds.AUTH.SUBMIT_BUTTON)).tap();

    await waitFor(element(by.id(TestIds.MAIN.HOME_TITLE)))
      .toBeVisible()
      .withTimeout(10000);

    await expect(element(by.id(TestIds.MAIN.HOME_SCREEN))).toBeVisible();
    await expect(element(by.id(TestIds.MAIN.SEARCH_INPUT))).toBeVisible();
  });
});

describe('Main navigation', () => {
  beforeAll(async () => {
    await device.launchApp({ newInstance: true });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.id(TestIds.AUTH.SUBMIT_BUTTON)).tap();
    await waitFor(element(by.id(TestIds.MAIN.HOME_TITLE)))
      .toBeVisible()
      .withTimeout(10000);
  });

  it('navigates between bottom tabs', async () => {
    await element(by.id(TestIds.MAIN.SETTINGS_TAB)).tap();
    await expect(element(by.id(TestIds.SETTINGS.SCREEN))).toBeVisible();

    await element(by.id(TestIds.MAIN.PROFILE_TAB)).tap();
    await expect(element(by.text(testMocks.credentials.email))).toBeVisible();

    await element(by.id(TestIds.MAIN.HOME_TAB)).tap();
    await expect(element(by.id(TestIds.MAIN.HOME_TITLE))).toBeVisible();
  });

  it('logs out from settings and returns to login', async () => {
    await element(by.id(TestIds.MAIN.SETTINGS_TAB)).tap();
    await element(by.id(TestIds.SETTINGS.LOGOUT_BUTTON)).tap();

    await waitFor(element(by.id(TestIds.AUTH.LOGIN_SCREEN)))
      .toBeVisible()
      .withTimeout(10000);
  });
});
