// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const { generate } = require('@storybook/react-native/scripts/generate');

generate({
  configPath: path.resolve(__dirname, './.storybook'),
});

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable resolving all file extensions
config.resolver.sourceExts = [
  'js',
  'jsx',
  'ts',
  'tsx',
  'json',
  'mjs',
  'ios.js',
  'ios.jsx',
  'ios.ts',
  'ios.tsx',
  'android.js',
  'android.jsx',
  'android.ts',
  'android.tsx',
  'web.js',
  'web.jsx',
  'web.ts',
  'web.tsx',
];

config.transformer.unstable_allowRequireContext = true;

// Add watchFolders to include the parent directory
config.watchFolders = [
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, './src'),
];

module.exports = config;
