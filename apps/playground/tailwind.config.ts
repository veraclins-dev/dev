import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import type { Config } from 'tailwindcss';

// @ts-expect-error - This import is not resolved correctly
import { extendedTheme } from '@veraclins-dev/utils';

console.log(extendedTheme);

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
