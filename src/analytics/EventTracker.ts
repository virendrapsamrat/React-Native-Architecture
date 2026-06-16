import { FirebaseAnalytics } from './FirebaseAnalytics';
import { Mixpanel } from './Mixpanel';

export const EventTracker = {
  trackScreenView: (screenName: string) => {
    FirebaseAnalytics.logEvent('screen_view', { screen_name: screenName });
    Mixpanel.track('Screen View', { screen: screenName });
  },

  trackLogin: (method: string) => {
    FirebaseAnalytics.logEvent('login', { method });
    Mixpanel.track('Login', { method });
  },

  trackSignup: (method: string) => {
    FirebaseAnalytics.logEvent('sign_up', { method });
    Mixpanel.track('Sign Up', { method });
  },

  trackProductView: (productId: string) => {
    FirebaseAnalytics.logEvent('view_item', { item_id: productId });
    Mixpanel.track('Product View', { product_id: productId });
  },
};
