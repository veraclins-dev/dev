/// <reference types='vitest/config' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,
  plugins: [tailwindcss(), reactRouter(), nxViteTsPaths()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
  },
  test: {
    setupFiles: ['test-setup.ts'],
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['./tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/playground',
      provider: 'v8',
    },
  },
});
