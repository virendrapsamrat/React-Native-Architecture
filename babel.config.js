/* global module */

module.exports = function babelConfig(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
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
    ],
  };
};
