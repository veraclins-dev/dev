import pkg from '@nx/eslint-plugin';

import baseConfig from '../../eslint.config.js';

export default [
  ...baseConfig,
  ...pkg.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
