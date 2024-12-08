const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { extendedTheme } = require('../utils/src');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: extendedTheme,
  },
  plugins: [],
};
