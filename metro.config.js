/* eslint-disable @typescript-eslint/no-require-imports */
/* global __dirname, module, require */

const path = require('path');
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
const srcRoot = path.resolve(__dirname, 'src');
const sourceExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];

config.watchFolders = Array.from(new Set([...(config.watchFolders ?? []), srcRoot]));
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  '@': srcRoot,
};

const resolveAliasFile = (targetPath) => {
  for (const extension of sourceExtensions) {
    const filePath = `${targetPath}${extension}`;
    if (fs.existsSync(filePath)) return filePath;
  }

  for (const extension of sourceExtensions) {
    const filePath = path.join(targetPath, `index${extension}`);
    if (fs.existsSync(filePath)) return filePath;
  }

  return null;
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@/')) {
    const filePath = resolveAliasFile(path.join(srcRoot, moduleName.slice(2)));

    if (filePath) {
      return {
        filePath,
        type: 'sourceFile',
      };
    }
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
