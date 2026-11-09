import ionic from '@ionic/eslint-config/recommended.js';
import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

export default defineConfig([
  { ignores: ['dist/**', 'android/**', 'ios/**', 'playwright-report/**', 'test-results/**', 'blob-report/**'] },
  ionic,
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // Regla de dependencias (mínimo 2): presentation -> domain <- data. Se verifica con lint.
  {
    files: ['src/features/*/domain/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'react',
                'react-*',
                '@ionic/*',
                'ionicons',
                'ionicons/*',
                'axios',
                '@capacitor/*',
                '@capacitor-*/*',
                '@aparajita/*',
                '@tanstack/*',
              ],
              message: 'domain/ es TypeScript puro: sin React, Ionic, Axios ni Capacitor.',
            },
            {
              group: ['**/data/**', '**/presentation/**', '../../data/*', '../../presentation/*'],
              message: 'domain/ no depende de data/ ni de presentation/.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/*/presentation/**/*.{ts,tsx}'],
    ignores: ['**/*.test.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['axios', '@capacitor/*', '@capacitor-*/*', '@aparajita/*'],
              message: 'presentation/ no usa HTTP ni plugins: pase por casos de uso o puertos.',
            },
            {
              group: ['**/data/**', '**/core/network/*', '**/core/storage/*'],
              message: 'presentation/ no importa data/ ni infraestructura directamente.',
            },
          ],
        },
      ],
    },
  },
]);
