import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import type { Config } from 'tailwindcss';

// eslint-disable-next-line
import { extendedTheme } from '../../packages/utils/src';

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
