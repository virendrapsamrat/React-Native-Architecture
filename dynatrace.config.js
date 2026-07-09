/* global module, process */

const applicationId = process.env.DYNATRACE_APPLICATION_ID;
const beaconUrl = process.env.DYNATRACE_BEACON_URL;
const hasNativeConfig = Boolean(applicationId && beaconUrl);
const debug = process.env.DYNATRACE_DEBUG === 'true';
const userOptIn = process.env.DYNATRACE_USER_OPT_IN === 'true';

const escapeGradleValue = (value) => String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const escapePlistValue = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const androidConfig = hasNativeConfig
  ? `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart {
                        applicationId '${escapeGradleValue(applicationId)}'
                        beaconUrl '${escapeGradleValue(beaconUrl)}'
                    }
                    userOptIn ${userOptIn}
                }
            }
        }
        `
  : `
        dynatrace {
            configurations {
                defaultConfig {
                    autoStart.enabled false
                }
            }
        }
        `;

const iosConfig = hasNativeConfig
  ? `
        <key>DTXApplicationID</key>
        <string>${escapePlistValue(applicationId)}</string>
        <key>DTXBeaconURL</key>
        <string>${escapePlistValue(beaconUrl)}</string>
        <key>DTXUserOptIn</key>
        <${userOptIn ? 'true' : 'false'}/>
        `
  : `
        <key>DTXAutoStart</key>
        <false/>
        `;

/** @type {import('@dynatrace/react-native-plugin').DynatraceUserConfiguration} */
module.exports = {
  react: {
    autoStart: hasNativeConfig,
    debug,
    errorHandler: {
      enabled: true,
      reportFatalErrorAsCrash: true,
    },
    lifecycle: {
      includeUpdate: false,
      instrument: () => false,
    },
    input: {
      instrument: () => true,
      actionNamePrivacy: false,
    },
    navigation: {
      enabled: true,
    },
    userInteraction: true,
  },
  android: {
    config: androidConfig,
  },
  ios: {
    config: iosConfig,
  },
};
