import { FirebaseAnalytics } from './FirebaseAnalytics';
import { Mixpanel } from './Mixpanel';
import { DynatraceAnalytics } from './DynatraceAnalytics';

export const EventTracker = {
  trackScreenView: (screenName: string) => {
    FirebaseAnalytics.logEvent('screen_view', { screen_name: screenName });
    Mixpanel.track('Screen View', { screen: screenName });
    DynatraceAnalytics.trackScreenView(screenName);
  },

  trackLogin: (method: string) => {
    FirebaseAnalytics.logEvent('login', { method });
    Mixpanel.track('Login', { method });
    DynatraceAnalytics.trackEvent('login', { method });
  },

  trackSignup: (method: string) => {
    FirebaseAnalytics.logEvent('sign_up', { method });
    Mixpanel.track('Sign Up', { method });
    DynatraceAnalytics.trackEvent('sign_up', { method });
  },

  trackProductView: (productId: string) => {
    FirebaseAnalytics.logEvent('view_item', { item_id: productId });
    Mixpanel.track('Product View', { product_id: productId });
    DynatraceAnalytics.trackEvent('view_item', { product_id: productId });
  },
};
