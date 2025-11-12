import pkg from '@nx/eslint-plugin';

import baseConfig from '../../eslint.config.js';

export default [
  ...pkg.configs['flat/react'],
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'event',
          message: 'Use local parameter instead.',
        },
        {
          name: 'fdescribe',
          message: 'Do not commit fdescribe. Use describe instead.',
        },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error'],
    },
  },
];
