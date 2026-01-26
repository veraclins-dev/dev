import pkg from '@nx/eslint-plugin';
import jsoncParser from 'jsonc-eslint-parser';

import baseConfig from '../../eslint.config.js';

export default [
	...pkg.configs['flat/base'],
	...baseConfig,
	{
		ignores: ['templates/**/*'],
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		rules: {},
	},
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}',
            '{projectRoot}/templates/**/*',
          ],
        },
      ],
    },
    languageOptions: {
      parser: jsoncParser,
    },
  },
];
