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
});
