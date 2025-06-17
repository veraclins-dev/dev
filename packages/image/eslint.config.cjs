const nx = require('@nx/eslint-plugin');
const baseConfig = require('../../eslint.config.js');

module.exports = [
  ...baseConfig,
  ...nx.configs['flat/react'],
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
