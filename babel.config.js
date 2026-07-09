/* global module */

module.exports = function babelConfig(api) {
  const isTest = api.env('test');

  return {
    presets: [
      [
        'babel-preset-expo',
        isTest
          ? {}
          : {
              jsxRuntime: 'automatic',
              jsxImportSource: '@dynatrace/react-native-plugin',
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
      ...(
        isTest
          ? []
          : ['@dynatrace/react-native-plugin/instrumentation/BabelPluginDynatrace']
      ),
    ],
  };
};
