const nx = require('@nx/eslint-plugin');
const simpleImportSort = require('eslint-plugin-simple-import-sort');

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
  },
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:auth',
                'type:editor',
                'type:form',
                'type:image',
                'type:ui',
                'type:utils',
                'type:react-utils',
                'type:cva',
              ],
            },
            {
              sourceTag: 'type:editor',
              onlyDependOnLibsWithTags: [
                'type:editor',
                'type:ui',
                'type:utils',
                'type:react-utils',
                'type:cva',
              ],
            },
            {
              sourceTag: 'type:form',
              onlyDependOnLibsWithTags: [
                'type:form',
                'type:ui',
                'type:utils',
                'type:react-utils',
                'type:cva',
              ],
            },
            {
              sourceTag: 'type:image',
              onlyDependOnLibsWithTags: [
                'type:image',
                'type:ui',
                'type:utils',
                'type:react-utils',
                'type:cva',
              ],
            },
            {
              sourceTag: 'type:react-utils',
              onlyDependOnLibsWithTags: [
                'type:react-utils',
                'type:utils',
                'type:cva',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: [
                'type:ui',
                'type:utils',
                'type:react-utils',
                'type:cva',
              ],
            },
            {
              sourceTag: 'type:auth',
              onlyDependOnLibsWithTags: ['type:auth', 'type:utils'],
            },
            {
              sourceTag: 'type:utils',
              onlyDependOnLibsWithTags: ['type:utils'],
            },
            {
              sourceTag: 'type:seo',
              onlyDependOnLibsWithTags: ['type:seo'],
            },
            {
              sourceTag: 'type:cva',
              onlyDependOnLibsWithTags: ['type:cva', 'type:utils'],
            },
          ],
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'],
            ['^@veraclins-dev(/.*|$)'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
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
];
