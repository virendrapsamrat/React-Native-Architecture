/* eslint-disable @typescript-eslint/no-require-imports */
/* global __dirname, module, process, require */

const fs = require('fs');
const path = require('path');

const loadDotEnv = () => {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return;

  fs.readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('#')) return;

      const separatorIndex = trimmedLine.indexOf('=');
      if (separatorIndex === -1) return;

      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();
      if (!key || process.env[key] !== undefined) return;

      process.env[key] = value.replace(/^['"]|['"]$/g, '');
    });
};

loadDotEnv();

module.exports = function babelConfig(api) {
  const isTest = api.env('test');
  const isDynatraceEnabled = process.env.EXPO_PUBLIC_DYNATRACE_ENABLED === 'true';
  const shouldInstrumentDynatrace = !isTest && isDynatraceEnabled;

  return {
    presets: [
      [
        'babel-preset-expo',
        shouldInstrumentDynatrace
          ? {
              jsxRuntime: 'automatic',
              jsxImportSource: '@dynatrace/react-native-plugin',
            }
          : isTest
          ? {}
          : {
              jsxRuntime: 'automatic',
            },
      ],
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
          extensions: ['.ios.ts', '.ios.tsx', '.android.ts', '.android.tsx', '.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
      ...(shouldInstrumentDynatrace
        ? ['@dynatrace/react-native-plugin/instrumentation/BabelPluginDynatrace']
        : []),
    ],
  };
};
