// https://docs.expo.dev/guides/using-eslint/
import expoConfig from 'eslint-config-expo/flat.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  // Ensure React Hooks rules (including exhaustive-deps) apply across JS/TS files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      // Warn on missing/incorrect effect/callback deps
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    ignores: ['dist/*'],
    rules: {
      'no-duplicate-imports': 'error',
      // Allow unused parameters starting with `_`, mostly for tests
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
