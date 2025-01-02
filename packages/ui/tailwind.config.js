import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'path';

// eslint-disable-next-line
import { extendedTheme } from '../utils/src';

/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const content = [
  join(
    __dirname,
    '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
  ),
  ...createGlobPatternsForDependencies(__dirname),
];
export const theme = {
  extend: extendedTheme,
};
export const plugins = [];
