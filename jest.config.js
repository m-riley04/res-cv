/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest.setup.ts',
    '@testing-library/jest-native/extend-expect',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',

  // These patterns tell Jest which files to include in coverage reporting
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
    'constants/**/*.{ts,tsx}',
    'enums/**/*.{ts,tsx}',
    'languages/**/*.{ts,tsx}',
    'theme/**/*.{ts,tsx}',
    // Exclude test files, config files, and type definitions
    '!**/__tests__/**',
    '!**/*.test.{ts,tsx}',
    '!**/*.spec.{ts,tsx}',
    '!**/*.d.ts',
    '!**/index.ts', // Usually just re-exports
  ],

  testMatch: ['**/__tests__/**/*.(ts|tsx|js)', '**/*.(test|spec).(ts|tsx|js)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@?react-native|@react-native|@expo|expo|@unimodules|@react-navigation)',
  ],
  // Performance optimizations
  maxWorkers: '50%',
};

export default config;
