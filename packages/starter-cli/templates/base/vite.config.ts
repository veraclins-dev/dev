/// <reference types='vitest/config' />
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { envOnlyMacros } from 'vite-env-only'
import tsconfigPaths from 'vite-tsconfig-paths'

const MODE = process.env.NODE_ENV

export default defineConfig((_config) => ({
	root: __dirname,
	build: {
		cssMinify: MODE === 'production',
		rollupOptions: {
			external: [/node:.*/, 'fsevents', 'path'],
		},
		sourcemap: true,
		assetsInlineLimit: (source: string) => {
			if (
				source.endsWith('sprite.svg') ||
				source.endsWith('favicon.svg') ||
				source.endsWith('apple-touch-icon.png')
			) {
				return false
			}
		},
	},
	server: {
		open: true,
		warmup: {
			clientFiles: [
				'./app/entry.client.tsx',
				'./app/root.tsx',
				'./app/routes/**/*.tsx',
			],
		},
		watch: {
			ignored: ['**/playwright-report/**'],
		},
		hmr: {
			port: 24679,
		},
	},
	optimizeDeps: {
		include: [
			'react-dom',
			'./app/entry.client.tsx',
			'./app/root.tsx',
			'./app/routes/**/*.tsx',
		],
		exclude: ['@veraclins-dev/ui', '@veraclins-dev/editor'],
	},
	plugins: [
		tailwindcss(),
		envOnlyMacros(),
		process.env.NODE_ENV === 'test' ? null : reactRouter(),
		tsconfigPaths(),
	],
	resolve: {
		alias: {
			'.prisma/client/index-browser':
				'./node_modules/.prisma/client/index-browser.js',
		},
	},
	test: {
		watch: false,
		globals: true,
		restoreMocks: true,
		environment: 'jsdom',
		include: ['./app/**/*.test.{ts,tsx}'],
		setupFiles: ['./tests/setup/setup-test-env.ts'],
		reporters: ['default'],
		coverage: {
			include: ['app/**/*.{ts,tsx}'],
			all: true,
			provider: 'v8',
		},
	},
}))
