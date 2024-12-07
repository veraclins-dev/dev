import type { Config } from 'tailwindcss';
import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { extendedTheme } from './app/utils/tailwind-theme';

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: extendedTheme,
  },
  plugins: [],
} satisfies Config;
