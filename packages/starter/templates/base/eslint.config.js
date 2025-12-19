import { default as defaultConfig } from '@epic-web/config/eslint'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	{
		rules: { 'react-hooks/exhaustive-deps': 'off' },
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
	},
	{
		files: ['**/tests/**/*.ts'],
		rules: { 'react-hooks/rules-of-hooks': 'off' },
	},
	{ ignores: ['.react-router/*', 'postgres-data/'] },
]
