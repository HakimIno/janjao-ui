const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const { getConfig } = require('react-native-builder-bob/metro-config');
const pkg = require('../package.json');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = getConfig(getDefaultConfig(__dirname), {
  root,
  pkg,
  project: __dirname,
});

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

// Add watchFolders to include the parent directory
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(root, 'src'),
  path.resolve(root, 'node_modules'),
];

module.exports = config;
