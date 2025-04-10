// metro.config.js
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

// ปิดการใช้งาน Storybook ชั่วคราวเพื่อแก้ปัญหา
// const { generate } = require('@storybook/react-native/scripts/generate');
// generate({
//   configPath: path.resolve(__dirname, './.storybook'),
// });

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

// เพิ่มการตั้งค่าเพื่อเพิ่มประสิทธิภาพ
config.transformer.unstable_allowRequireContext = true;
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.extraNodeModules = {
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
};

// Add watchFolders to include the parent directory and example
config.watchFolders = [
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, './src'),
  path.resolve(__dirname, './example'),
];

// เพิ่มการกำหนดค่า maxWorkers เพื่อป้องกัน memory leak
config.maxWorkers = 2;

module.exports = config;
